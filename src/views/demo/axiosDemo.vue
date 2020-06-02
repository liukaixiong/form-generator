

<template>
  <div>haha</div>
</template>

<script>
import service from "@/utils/request.js";
export default {
  name: "",
  data() {
    return {
      selectValue: "",
      initOptionData: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    };
  },
  beforeCreate() {
    console.log(1111);
  },
  // watch(){},
  created() {
    console.log(2222);
  },
  beforeMount() {
    console.log(3333);
  },
  mounted() {


    service.request({
        method: "post",
        url: "/getSms/"
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    }).then(resp =>{
      console.log(resp)
    })
    // 已经被渲染 1次
    // console.log(44444);
    // this.initOption();
    // 2
  },
  methods: {
    /**
     * 初始化下拉选择
     */
    // initOption(){
    //     let initData = this.config.init;
    //     let optionArr = [];
    //     // 数据检验
    //     if(initData.length === 0) {
    //         console.log("config的参数是空的，无法显示下拉菜单；");
    //         return false;
    //     }
    //     initData.forEach(item => {
    //         let arr = this.option.filter(elem => elem.value == item); // filter匹配成功后是一个数组，需要取下标第一个
    //         if(arr.length > 0) {
    //             optionArr.push(arr[0]);
    //         }
    //     })
    //     // 数据检验
    //     if(optionArr.length === 0) {
    //         console.log("匹配的数据为空！");
    //         return false;
    //     }
    //     // 初始化赋值
    //     this.initOptionData = optionArr;
    //     // 初始化搜索类型
    //     this.selectValue = optionArr[0].value;
    // }
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // config: {
    //     handler(newValue, oldValue){
    //         console.log(55555);
    //         // this.initOption();
    //     },
    //     immediate: true  // 组件初始化时，马上对config监听。
    // }
  }
};
</script>