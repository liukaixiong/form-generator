export const selectConfig = [
    {
        __config__: {
            label: '动态下拉选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            defaultValue: undefined,
            layout: 'colFormItem',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/select'
        },
        __slot__: {
            bgConfig: "demo"
        },
        placeholder: '请选择',
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false
    }, {
        __config__: {
            label: '级联选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-cascader',
            tagIcon: 'cascader',
            layout: 'colFormItem',
            defaultValue: [],
            dataType: 'dynamic',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
        },
        __slot__: {
            bgConfig: "demo"
        },
        placeholder: '请选择',
        style: { width: '100%' },
        props: {
            props: {
                multiple: false,
                label: 'label',
                value: 'value',
                children: 'children'
            }
        },
        'show-all-levels': true,
        disabled: false,
        clearable: true,
        filterable: false,
        separator: '/'
    }, {
        __config__: {
            label: '多选框组',
            tag: 'el-checkbox-group',
            tagIcon: 'checkbox',
            defaultValue: [],
            span: 24,
            showLabel: true,
            labelWidth: null,
            layout: 'colFormItem',
            optionType: 'default',
            required: true,
            regList: [],
            changeTag: true,
            border: false,
            document: 'https://element.eleme.cn/#/zh-CN/component/checkbox'
        },
        __slot__: {
            bgConfig: 'demo'
        },
        style: {},
        size: 'medium',
        min: null,
        max: null,
        disabled: false
    }

]

export const componentList = [];
const obj = {
    title: '下拉类型',
    list: selectConfig
}
componentList.push(obj);
export default componentList;