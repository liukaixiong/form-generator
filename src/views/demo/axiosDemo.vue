

<template>
  <div>haha</div>
</template>

<script>
import axios from 'axios'
import service from '@/utils/axiosRequest'
export default {
  name: "Historys",
  data() {
    return {
      totalData: 0,
      tableData: []
    };
  },
  mounted : function(){
    this.handleClick();
  },
  async created() {
    try {
      let res = await this.getHistoryData();
      console.log(res);
      // 等拿到返回数据res后再进行处理
      this.tableData = res.data.result;
      
      this.totalData = res.data.count;
    } catch (err) {
      console.log(err);
      alert("请求出错");
    }
  },
  methods: {
    async handleClick() {
      try {
        let res = await this.getHistoryData();
        console.log(res);
        // 等拿到返回数据res后再进行处理
        let tableData = res.data.data;
        console.info("tableData : ",tableData)
      } catch (err) {
        console.log(err);
        alert("请求出错");
      }
    },
    // 封装axios请求，返回promise, 用于调用getHistoryData函数后作不同处理
    getHistoryData(data) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:5555/select")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>