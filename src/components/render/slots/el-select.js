import { converKeyValue, converKeyValueByList } from '@/utils/jsonUtil'
import selelctService from '../bgConfig/el-select-service.js'
import service from '@/utils/requestService.js'

function renderVue(h, options) {
  const list = []
  options.forEach(item => {
    list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
  })
  return list
}

export default {
  options(h, conf, key) {
    return renderVue(h, conf.__slot__.options)
  },
  bgConfig(h, conf, key) {
    let bgconfigKey = conf.__slot__.bgConfig;
    let bgConfig = selelctService[bgconfigKey]
    // 这里render渲染可能需要同步请求数据,异步获取不到返回值
    const resultData = service.ajax(bgConfig.url, bgConfig.method, null);
    let tableData = resultData.data;
    let options = [];
    let conversion = bgConfig.conversion;
    tableData.forEach((obj, index) => {
      var jsonObject = converKeyValue(conversion, obj);
      options[index] = jsonObject;
    })
    return renderVue(h, options);
  },
  /**
   * 后台请求数据并且回调给页面
   * @param {*} bgconfigValue 后台配置的值
   * @param {*} cb            回调给页面
   */
  bgConfigJson(bgconfigValue, cb) {
    let bgConfig = selelctService[bgconfigValue]
    service.request(bgConfig.url, bgConfig.method, bgConfig.data).then(response => {
      let tableData = response.data;
      let options = [];
      let conversion = bgConfig.conversion;
      tableData.forEach((obj, index) => {
        var jsonObject = converKeyValue(conversion, obj);
        options[index] = jsonObject;
      })
      cb(options);
    })
  }
}
