export default {
  options(h, conf, key, child) {
    const list = []
    conf.__slot__.options.forEach(item => {
      const selectArray = []
      if (child) {
        child.forEach((obj) => {
          if (item.value === obj.data.attrs['parentGroupValue']) {
            selectArray.push(obj);
          }
        })
      }
      list.push(<el-tab-pane label={item.label} name={item.value} >{selectArray}</el-tab-pane>)
    })
    return list
  }
}
