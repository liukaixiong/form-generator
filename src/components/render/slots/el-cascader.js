import { converStrKeyValueByList } from '@/utils/jsonUtil'
import selelctService from '../bgConfig/el-cascader-service.js'
import service from '@/utils/requestService.js'

function getJsonObject(resultData, bgConfig) {
    if (!resultData) {
        return null;
    }
    let tableData = resultData;
    let conversion = bgConfig.conversion;
    return converStrKeyValueByList(conversion, tableData);
}

export default {
    /**
     * 后台请求参数，这里需要注意的是这里是渲染阶段
     * @param {*} h
     * @param {*} conf 
     * @param {*} key 
     */
    bgConfig(h, conf, key) {
        let bgconfigKey = conf.__slot__.bgConfig;
        let bgConfig = selelctService[bgconfigKey]
        // 这里render渲染可能需要同步请求数据,异步获取不到返回值
        const resultData = service.ajax(bgConfig.url, bgConfig.method, null);

        conf['options'] = getJsonObject(resultData.data, bgConfig);
    },
    /**
     * 后台请求数据并且回调给页面生成VUE格式代码
     * @param {*} bgconfigValue 后台配置的值
     * @param {*} cb            回调给页面
     */
    bgConfigJson(bgconfigValue, cb) {
        let bgConfig = selelctService[bgconfigValue]
        service.request(bgConfig.url, bgConfig.method, bgConfig.data).then(response => {
            let tableData = response.data;
            let dataJson = getJsonObject(tableData, bgConfig)
            cb(dataJson);
        })
    }
}
