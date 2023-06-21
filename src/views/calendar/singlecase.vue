<template>
  <div class="single-case">
    <el-form
      class="single-form"
      :label-position="labelPosition"
      label-width="400px"
      :model="formLabelAlign"
    >
      <el-form-item label="年份">
        <el-input v-model="formLabelAlign.year"></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-input v-model="formLabelAlign.month"></el-input>
      </el-form-item>
      <el-form-item label="天数">
        <el-input v-model="formLabelAlign.day"></el-input>
      </el-form-item>
      <el-form-item label="预期输出">
        <el-input v-model="formLabelAlign.expectation"></el-input>
      </el-form-item>
    </el-form>
          <el-button
        class="main-button"
        type="success"
        plain
        @click="doTest"
        :loading="loading"
        >进行测试<i class="el-icon-upload el-icon--right"></i
      ></el-button>
        <div>
    <span>实际输出：{{actual}}</span>
    <el-divider direction="vertical"></el-divider>
    <span>测试结果：{{state}}</span>
    <el-divider direction="vertical"></el-divider>
  </div>
  </div>
</template>

<script>

//import { testcalendar } from "@/api/calendartest.js";

export default {
  name: "SingleCase",
  components: {},
  props: {},
  data() {
    return {
      actual:"",
      state:"",
      labelPosition: 'right',
        formLabelAlign: {
          year: 0,
          month: 0,
          day: 0,
          expectation:0,
        },
        date:"",
        loading:false,

    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    is_leap_year( year)
    {
      if( (year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
      {
        return 1;
      }
      else {return 0;}

    },
    isValidDate(year, month, day) {
      if (year < 1900  || year > 2100 || month > 12 || day < 1) {
        return false;
      }

      var days_in_month = [0,31, 28 + this.is_leap_year(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return day <= days_in_month[month];
    },
    formatDate(year, month, day) {
      // 检查输入的年月日是否是合法日期
      var days_in_month = [0,31, 28 + this.is_leap_year(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if(day<days_in_month[month])
      {
        day++;
      }
      else if(month===12)
      {
        year++;
        month=1;
        day=1;
      }
      else {
        month++;
        day=1;
      }
      if (this.isValidDate(year, month, day)) {
        // 使用padStart函数来确保月份和日期始终是两位数
        var formattedDate = year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        return formattedDate ;
      } else {
        return String(-1);
      }
    },
    doTest(){
      const year=this.formLabelAlign.year,
          month= this.formLabelAlign.month,
          day=this.formLabelAlign.day,
          expectation= this.formLabelAlign.expectation;
      const result = this.formatDate(year, month, day) ;
      this.actual = result;
      if(result===expectation)
      {
        this.state= "测试用例通过";
      }
      else {
        this.state="测试用例失败";
      }



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
