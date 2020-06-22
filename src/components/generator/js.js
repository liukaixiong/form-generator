import { isArray } from 'util'
import { exportDefault, titleCase } from '@/utils/index'
import ruleTrigger from './ruleTrigger'

const units = {
  KB: '1024',
  MB: '1024 / 1024',
  GB: '1024 / 1024 / 1024'
}
let confGlobal
const inheritAttrs = {
  file: '',
  dialog: 'inheritAttrs: false,'
}

/**
 * 组装js 【入口函数】
 * @param {Object} formConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpJs(formConfig, type) {
  confGlobal = formConfig = JSON.parse(JSON.stringify(formConfig))
  const dataList = []
  const ruleList = []
  const optionsList = []
  const propsList = []
  const methodList = mixinMethod(type)
  const uploadVarList = []
  const mountedList = [];

  formConfig.fields.forEach(el => {
    buildAttributes(el, dataList, ruleList, optionsList, methodList, propsList, uploadVarList)
    buildMounted(el, mountedList);
  });

  // 处理data类型的方法
  const dataConfig = {
    "data": dataList.join('\n'),
    "rules": ruleList.join('\n'),
    "uploadVar": uploadVarList.join('\n'),
    "selectOptions": optionsList.join('\n'),
    "props": propsList.join('\n')
  }


  const script = buildexport(
    formConfig,
    type,
    dataConfig,
    mountedList.join('\n'),
    methodList.join('\n')
  )
  confGlobal = null
  return script
}

function buildMounted(scheme, mounted) {
  const config = scheme.__config__
  if (scheme.__slot__ && scheme.__slot__.bgConfig) {
    const slot = scheme.__slot__;
    const bgConfig = slot.bgConfig;
    if (bgConfig) {
      const model = `${scheme.__vModel__}Options`;
      const options = titleCase(model)
      console.info(options);
      buildInitField(model, config.tag, bgConfig, mounted)
    }
  }
}
/**
 * 初始化字段赋值
 * @param {*} model     字段名称
 * @param {*} tag       字段标签类型
 * @param {*} bgConfig  后台配置标识
 * @param {*} mounted   初始化字段列表
 */
function buildInitField(model, tag, bgConfig, mounted) {
  const str = `this.$dataProcess.get('${tag}','${bgConfig}',(response) => this.${model} = response)`
  mounted.push(str)
}

// 构建组件属性
function buildAttributes(scheme, dataList, ruleList, optionsList, methodList, propsList, uploadVarList) {
  const config = scheme.__config__
  const slot = scheme.__slot__
  buildData(scheme, dataList)
  buildRules(scheme, ruleList)

  // 特殊处理options属性
  if (scheme.options || (slot && slot.options && slot.options.length)) {
    buildOptions(scheme, optionsList)
    if (config.dataType === 'dynamic') {
      const model = `${scheme.__vModel__}Options`
      const options = titleCase(model)
      buildOptionMethod(`get${options}`, model, methodList)
    }
  }
  // 处理服务端传递过来的属性
  if (scheme.options || (slot && slot.bgConfig && slot.bgConfig.length)) {
    buildOptions(scheme, optionsList)
  }

  // 处理props
  if (scheme.props && scheme.props.props) {
    buildProps(scheme, propsList)
  }

  // 处理el-upload的action
  if (scheme.action && config.tag === 'el-upload') {
    uploadVarList.push(
      `${scheme.__vModel__}Action: '${scheme.action}',
      ${scheme.__vModel__}fileList: [],`
    )
    methodList.push(buildBeforeUpload(scheme))
    // 非自动上传时，生成手动上传的函数
    if (!scheme['auto-upload']) {
      methodList.push(buildSubmitUpload(scheme))
    }
  }

  // 构建子级组件属性
  if (config.children) {
    config.children.forEach(item => {
      buildAttributes(item, dataList, ruleList, optionsList, methodList, propsList, uploadVarList)
    })
  }
}

// 混入处理函数
function mixinMethod(type) {
  const list = []; const
    minxins = {
      file: confGlobal.formBtns ? {
        submitForm: `submitForm() {
        this.$refs['${confGlobal.formRef}'].validate(valid => {
          if(!valid) return
          // TODO 提交表单

        })
      },`,
        resetForm: `resetForm() {
        this.$refs['${confGlobal.formRef}'].resetFields()
      },`
      } : null,
      dialog: {
        onOpen: 'onOpen() {},',
        onClose: `onClose() {
        this.$refs['${confGlobal.formRef}'].resetFields()
      },`,
        close: `close() {
        this.$emit('update:visible', false)
      },`,
        handelConfirm: `handelConfirm() {
        this.$refs['${confGlobal.formRef}'].validate(valid => {
          if(!valid) return
          this.close()
        })
      },`
      }
    }

  const methods = minxins[type]
  if (methods) {
    Object.keys(methods).forEach(key => {
      list.push(methods[key])
    })
  }

  return list
}

// 构建data
function buildData(scheme, dataList) {
  const config = scheme.__config__
  if (scheme.__vModel__ === undefined) return
  const defaultValue = JSON.stringify(config.defaultValue)
  dataList.push(`${scheme.__vModel__}: ${defaultValue},`)
}

// 构建校验规则
function buildRules(scheme, ruleList) {
  const config = scheme.__config__
  if (scheme.__vModel__ === undefined) return
  const rules = []
  if (ruleTrigger[config.tag]) {
    if (config.required) {
      const type = isArray(config.defaultValue) ? 'type: \'array\',' : ''
      let message = isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.placeholder
      if (message === undefined) message = `${config.label}不能为空`
      rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[config.tag]}' }`)
    }
    if (config.regList && isArray(config.regList)) {
      config.regList.forEach(item => {
        if (item.pattern) {
          rules.push(
            `{ pattern: ${eval(item.pattern)}, message: '${item.message}', trigger: '${ruleTrigger[config.tag]}' }`
          )
        }
      })
    }
    ruleList.push(`${scheme.__vModel__}: [${rules.join(',')}],`)
  }
}

// 构建options
function buildOptions(scheme, optionsList) {
  if (scheme.__vModel__ === undefined) return
  // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
  let { options } = scheme
  if (!options) options = scheme.__slot__.options
  if (scheme.__config__.dataType === 'dynamic') { options = [] }
  const str = `${scheme.__vModel__}Options: ${JSON.stringify(options)},`
  optionsList.push(str)
}

function buildProps(scheme, propsList) {
  const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props.props)},`
  propsList.push(str)
}

// el-upload的BeforeUpload
function buildBeforeUpload(scheme) {
  const config = scheme.__config__
  const unitNum = units[config.sizeUnit]; let rightSizeCode = ''; let acceptCode = ''; const
    returnList = []
  if (config.fileSize) {
    rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
    if(!isRightSize){
      this.$message.error('文件大小超过 ${config.fileSize}${config.sizeUnit}')
    }`
    returnList.push('isRightSize')
  }
  if (scheme.accept) {
    acceptCode = `let isAccept = new RegExp('${scheme.accept}').test(file.type)
    if(!isAccept){
      this.$message.error('应该选择${scheme.accept}类型的文件')
    }`
    returnList.push('isAccept')
  }
  const str = `${scheme.__vModel__}BeforeUpload(file) {
    ${rightSizeCode}
    ${acceptCode}
    return ${returnList.join('&&')}
  },`
  return returnList.length ? str : ''
}

// el-upload的submit
function buildSubmitUpload(scheme) {
  const str = `submitUpload() {
    this.$refs['${scheme.__vModel__}'].submit()
  },`
  return str
}

function buildOptionMethod(methodName, model, methodList) {
  const str = `${methodName}() {
    // TODO 发起请求获取数据
    this.${model}
  },`
  methodList.push(str)
}

// js整体拼接
function buildexport(conf, type, dataConfig, mounted, methods) {
  const str = `${exportDefault}{
  ${inheritAttrs[type]}
  components: {},
  props: [],
  data () {
    return {
      ${conf.formModel}: {
        ${dataConfig.data}
      },
      ${conf.formRules}: {
        ${dataConfig.rules}
      },
      ${dataConfig.uploadVar}
      ${dataConfig.selectOptions}
      ${dataConfig.props}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    ${mounted}
  },
  methods: {
    ${methods}
  }
}`
  return str
}
