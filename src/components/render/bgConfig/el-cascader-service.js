// 远程服务下拉框选型配置
export const config = {
    demo : {
        url: "http://localhost:5555/cascder",
        method:"get",
        conversion:{
          value:"id",
          label: "name",
          children:"list"
        },
        data:null
    }
}

export default config;