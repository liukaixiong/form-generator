

/**
 * 根据指定的列对象转换成新的对象
 * @param {*} columnObj     列对象  K 新的列的K , V +> dataObj的key
 * @param {*} dataObj       
 */
export function converKeyValue(columnObj, dataObj) {
    let jsonObject = {};
    for (var key in columnObj) {
        var value = columnObj[key];
        jsonObject[key] = dataObj[value];
    }
    return jsonObject;
}
/**
 * 根据指定的dataList列表转换成columnObj相对应的属性列表
 */
export function converKeyValueByList(columnObj, dataList) {
    const list = [];
    dataList.each((dataObj,index) =>{
        let jsonObject = {};
        for (var key in columnObj) {
            var value = columnObj[key];
            jsonObject[key] = dataObj[value];
        }
        list[index] = jsonObject;
    })
    return list;
}
/**
 * 将List对象转换成String之后,统一替换key，然后转换成List
 * @param {*} columnObj K/V转换参数  K为最终替换的K,V为dataList中的K
 * @param {*} dataList  改造的List
 */
export function converStrKeyValueByList(columnObj,dataList){
    var strData = JSON.stringify(dataList)
    for (var name in columnObj) {
        strData = strData.replace(new RegExp(columnObj[name] ,'g'),name)
    }
    return JSON.parse(strData);
}

export default converKeyValue;