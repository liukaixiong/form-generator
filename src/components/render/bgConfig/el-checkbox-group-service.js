// 远程服务多选组选型配置
export const config = {
    demo : {
        url: "http://localhost:5555/group",
        method:"get",
        conversion:{
          value:"id",
          label: "name"
        },
        data:null
    }
}

export default config;