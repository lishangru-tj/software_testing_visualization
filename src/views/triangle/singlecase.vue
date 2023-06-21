<template>
  <div class="single-case">
    <el-form
      class="single-form"
      :label-position="labelPosition"
      label-width="400px"
      :model="formLabelAlign"
    >
      <el-form-item label="第一条边的值">
        <el-input v-model="formLabelAlign.A"></el-input>
      </el-form-item>
      <el-form-item label="第二条边的值">
        <el-input v-model="formLabelAlign.B"></el-input>
      </el-form-item>
      <el-form-item label="第三条边的值">
        <el-input v-model="formLabelAlign.C"></el-input>
      </el-form-item>
      <el-form-item label="程序预期输出">
        <el-select v-model="formLabelAlign.expectation">
          <el-option label="不能构成三角形" value="不能构成三角形"></el-option>
          <el-option label="是等边三角形" value="是等边三角形"></el-option>
          <el-option label="是等腰直角三角形" value="是等腰直角三角形"></el-option>
          <el-option label="是等腰的钝角三角形" value="是等腰的钝角三角形"></el-option>
          <el-option label="是等腰三角形" value="是等腰三角形"></el-option>
          <el-option label="是直角三角形" value="是直角三角形"></el-option>
          <el-option label="是普通的钝角三角形" value="是普通的钝角三角形"></el-option>
          <el-option label="是普通的锐角三角形" value="是普通的锐角三角形"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
          
    <div>
      <el-button
        class="main-button"
        type="success"
        plain
        @click="doTest"
        :loading="loading"
        style="width:120px;margin-right: 50px;margin-left: 300px;"
        >进行测试<i class="el-icon-upload el-icon--right"></i
      ></el-button>
      <span>实际输出：{{actual}}</span>
      <el-divider direction="vertical"></el-divider>
      <span>测试结果：{{testResult}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleCase",
  components: {},
  props: {},
  data() {
    return {
      testResult: "",
      actual:"",
      labelPosition: 'right',
      formLabelAlign:
      {
          A: "",
          B: "",
          C: "",
          expectation: ""
        }, 
        date:"",
        loading:false,

    };
  },
  computed: {},
  watch: {
    'formLabelAlign.expectation': {
      handler(newVal) {
        this.testResult =
          this.actual === newVal ? '通过' : '不通过';
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    doTest() {
      this.actual = this.testTriangle(parseInt(this.formLabelAlign.A), parseInt(this.formLabelAlign.B), parseInt(this.formLabelAlign.C));
      this.testResult = this.actual === this.formLabelAlign.expectation ? '通过' : '不通过';
    },
    testTriangle(a, b, c) {
      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0)
      return '不构成三角形';
      else if (a + b <= c || b + c <= a || a + c <= b)
        return '不能构成三角形';
      else if (a === b && b === c)
        return '是等边三角形';
      else if (a === b || b === c|| a === c) {
        if (a ** 2 + b ** 2 === c ** 2 || b ** 2 + c ** 2 === a ** 2 || a ** 2 + c ** 2 === b ** 2)
          return '是等腰直角三角形';
        else
          return '是等腰三角形';
      } else if (a ** 2 + b ** 2 === c ** 2 || b ** 2 + c ** 2 === a ** 2 || a ** 2 + c ** 2 === b ** 2)
        return '是直角三角形';
      else if (a ** 2 + b ** 2 < c ** 2 || b ** 2 + c ** 2 < a ** 2 || a ** 2 + c ** 2 < b ** 2)
        return '是普通的钝角三角形';
      else
        return '是普通的锐角三角形';
    }
  },
};
</script>

<style scoped>
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
  width:100%;

}
.box-card {
  padding: 0;
}
.single-form{
  width:600px;
  top:50%;
  left:50%;
}
</style>
