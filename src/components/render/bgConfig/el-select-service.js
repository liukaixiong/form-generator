// 远程服务下拉框选型配置
export const config = {
    demo : {
        url: "http://localhost:5555/select",
        method:"get",
        conversion:{
          value:"id",
          label: "name"
        },
        data:null
    }
}

export default config;