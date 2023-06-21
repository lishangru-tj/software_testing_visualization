<template>
  <div class="single-case">
    <el-form class="single-form" :label-position="labelPosition" label-width="400px" :model="formLabelAlign">
      <el-form-item label="销售的主机数量M（台）">
        <el-input v-model="formLabelAlign.M"></el-input>
      </el-form-item>
      <el-form-item label="销售的显示器数量I（台）">
        <el-input v-model="formLabelAlign.I"></el-input>
      </el-form-item>
      <el-form-item label="销售的外设数量P（套）">
        <el-input v-model="formLabelAlign.P"></el-input>
      </el-form-item>
      <el-form-item label="预计状态（正常/错误）">
        <el-input v-model="formLabelAlign.predict"></el-input>
      </el-form-item>
      <el-form-item label="预计销售额（元）">
        <el-input v-model="formLabelAlign.pre_amount"></el-input>
      </el-form-item>
      <el-form-item label="预计佣金（元）">
        <el-input v-model="formLabelAlign.pre_earn"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="main-button" type="success" plain @click="doTest" :loading="loading">进行测试<i
        class="el-icon-upload el-icon--right"></i></el-button>
    <div>
      <span>实际状态：{{ S }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>实际销售额：{{ A }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>实际佣金{{ E }}</span>
      <el-divider direction="vertical"></el-divider>
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
      S: "",
      A: "",
      E: "",
      labelPosition: 'right',
      formLabelAlign: {
        M: "",
        I: "",
        P: "",
        predict: "正常/错误",
        pre_amount: "",
        pre_earn: "",
      },
      date: "",
      loading: false,

    };
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    doTest() {
      var commissionRate = 0;
      if (this.formLabelAlign.M < 1 || this.formLabelAlign.M > 70) {
        this.S = "异常"
        return
      }
      if (this.formLabelAlign.I < 1 || this.formLabelAlign.I > 80) {
        this.S = "异常"
        return
      }
      if (this.formLabelAlign.P < 1 || this.formLabelAlign.P > 90) {
        this.S = "异常"
        return
      }
      this.S = "正常"
      this.A = this.formLabelAlign.M * 25 + this.formLabelAlign.I * 30 + this.formLabelAlign.P * 45
      if (this.A <= 1000) {
        commissionRate = 0.1;
      } else if (this.A <= 1800) {
        commissionRate = 0.15;
      } else {
        commissionRate = 0.2;
      }
      this.E = this.A * commissionRate
      
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
  width: 100%;

}

.box-card {
  padding: 0;
}

.single-form {
  width: 600px;
  top: 50%;
  left: 50%;
}
</style>
