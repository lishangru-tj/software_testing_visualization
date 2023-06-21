<template>
  <div ref="tabs" >
  <el-card id="main-card" style="height:100%" shadow="hover">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="问题描述和分析" name="first">
            <ECommerceQuestion />
          </el-tab-pane>

          <el-tab-pane label="测试需考虑的边界值" name="second">
            <ECommerceSolution />
          </el-tab-pane>

        </el-tabs>
      </el-card>
  </div>
  
  </template>
  
  <script>
  
import ECommerceQuestion from "./question";
import ECommerceSolution from "./solution";
  export default {
    name: "two",
    components: { ECommerceQuestion,ECommerceSolution},
    props: {},
    data() {
      return {
        options: [
        ],
        value: "选项1",
        tableData: [],
        loading: false,
        classState: [],
        stateflag: false,
        activeName: "first",
        isFirst:true,
        labelPosition: 'right',
          formLabelAlign: {
            name: '',
            region: '',
            type: ''
          }
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      
  
    },
    methods: {
      
    },
  };
  
  
  
  
  
  </script>
  
  
  
  
  <style scoped lang="less">
  /deep/ .el-table .error-row {
    background: #fff0f0;
  }
  /deep/ .el-table .success-row {
    background-color: #f7fff9;
  }
  .item {
    margin-bottom: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .main-form {
    margin-top: 10px;
  }
  .main-button {
    width: 100%;
    margin-top: 10px;
  }
  .box-card {
    padding: 0;
  }
  .single-form{
    width:600px;
    top:50%;
    left:50%;
  }
  .block{
  
  }
  </style>
