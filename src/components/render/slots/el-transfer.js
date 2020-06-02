export default {
  options(h, conf, key) {
      const list = []
      conf.__slot__.options.forEach(item => {
      //   list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
        list.push(<span>{item.key} - {item.label}</span>)
      })
      return list
  }
  // data(h, conf, key) {
  //   const list = []
  //     // conf.__slot__.options.forEach(item => {
  //     // //   list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
  //     //   list.push(<span>{item.key} - {item.label}</span>)
  //     // })
  //   return list
  // }
}