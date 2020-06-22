

const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */
const slotsFiles = require.context('@/components/render/slots', true, /\.js$/)
const keys = slotsFiles.keys() || []
keys.forEach(key => {
    const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = slotsFiles(key).default
    componentChild[tag] = value
})

export default {
    get(tagKey, dataConfigType,cb) {
        const func = componentChild[tagKey]
        const bgconfigJson = func['bgConfigJson']
        if(bgconfigJson){
            bgconfigJson(dataConfigType,cb)
        }
    }
}