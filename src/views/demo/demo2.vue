<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :clone="clone"
        :group="{ name: 'people', pull: pullFunction }"
        @start="start"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.id">{{ element.name }}</div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable class="dragArea list-group" :list="list2" group="people">
        <div class="list-group-item" v-for="element in list2" :key="element.id">{{ element.name }}</div>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" /> -->

    <!-- <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
    <div class="col-3">
      <draggable
        element="el-tabs"
        class="dragArea list-group"
        type="border-card"
        :list="list5"
        :clone="clone"
        group="people"
        @add="addTabsDate"
        :component-data="getData()"
        @end="end"
        @change="change"
        :move="moveData"
        @update="update"
        @start="startClick"
      >
        <el-tab-pane
          v-for="dataObj in list3"
          :key="dataObj.id+''"
          :label="dataObj.name"
          :name="dataObj.id+''"
        >{{list5}}</el-tab-pane>
      </draggable>
    </div>

    <!-- <div class="col-3"> -->
    <!-- <el-select v-model="optionsValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
    </el-select>-->
    <!-- <draggable
        element="el-select"
        class="dragArea list-group"
        multiple="false"
        placeholder="请选择"
        :component-data="getData()"
        :list="list4"
        group="people"
        @end="end"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </draggable>

      <el-tab-pane label="用户管理" name="first">
        <el-select v-model="optionsValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
    </el-tab-pane>-->
    <!-- <el-select v-model="optionsValue" placeholder="请选择">
        <draggable
          element="el-option"
          class="dragArea list-group"
          :clone="clone"
          v-for="item in options"
          :key="item.value"
          :value="item.value"
        >
          <el-option>{{item.lable}}</el-option>
        </draggable>
      </el-select> 
    </div>-->

    <!-- <div class="col-3">
      <el-tabs v-model="optionsValueStr" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-select v-model="optionsValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  name: "clone-on-control",
  display: "Clone on Control",
  instruction: "Press Ctrl to clone element from list 1",
  order: 4,
  components: {
    draggable
  },
  watch: {
    list4: {
      handler(newName, oldName) {
        console.log("watch list 4" + newName);
      }
    }
  },
  computed: {
    list5: {
      get() {
        return this.list4;
      },
      set(value) {
        console.log("set value :" + value);
      }
    }
  },
  data() {
    return {
      activeName: "102",
      list1: [
        { name: "Jesus", id: 1 },
        { name: "Paul", id: 2 },
        { name: "Peter", id: 3 }
      ],
      list2: [
        { name: "Luc", id: 5 },
        { name: "Thomas", id: 6 },
        { name: "John", id: 7 }
      ],
      list3: [
        { name: "用户管理", id: 100, html: [] },
        { name: "配置管理", id: 101, html: [] },
        { name: "角色管理", id: 102, html: [] },
        { name: "定时任务补偿", id: 103, html: [] }
      ],
      list4: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      optionsValue: ["选项5"],
      optionsValueStr: "103",
      controlOnStart: true
    };
  },
  methods: {
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },
    startClick(evt) {
      console.log("start click " + evt);
    },
    end(evt) {
      //   this.controlOnStart = originalEvent.ctrlKey;
      console.log("end method" + evt);
    },
    inputClick(event){
      console.log("input click ",event)
    },
    change: function (evt) {
      console.log("change : ",evt);
      let data = JSON.stringify(evt.added.element);
      let newCollectionIndex = evt.added.newIndex - 1;
      let modelData = {};
      modelData['key']=this.activeName;
      modelData['value']=data;
      this.list4.splice(newCollectionIndex, 0, modelData)
    },
    handleChange(event) {
      console.log("changed");
    },
    inputChanged(value) {
      console.log(value);
      this.optionsValue = value;
    },
    update(element) {
      console.log(" update : " , element);
    },
    addTabsDate(index,element) {
      // let newCollectionIndex = evt.newIndex
      // let menuIndex = evt.oldIndex

      // let newCollection = {}
      // this.list4.splice(newCollectionIndex, 0, newCollection)
      console.log("addTabsDate method",index,element);
    },
    moveData(newIndex,oldIndex,element){
        console.log("move data : ")
    },
    tabClick(tab, event){
      console.log("tab click ",tab,event);
    },

    getData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
          value: this.activeName + "",
          type: "border-card"
        }
      };
    }
  }
};
</script>
<style scoped></style>