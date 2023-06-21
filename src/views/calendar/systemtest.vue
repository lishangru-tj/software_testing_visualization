<template>
  <div class="system-test">
    <div class="main-header">
      <el-select v-model="value" placeholder="请选择测试方法">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <div class="button-group">
        <el-button
          class="main-button"
          type="success"
          plain
          @click="doTest"
          :loading="loading"
          >进行测试<i class="el-icon-upload el-icon--right"></i
        ></el-button>
        <el-button
          @click="reset(value)"
          class="reset-button"
          type="warning"
          plain
          >重置</el-button
        >
      </div>
    </div>

    <el-divider content-position="right">测试用例</el-divider>

    <div class="main-table">
      <el-table
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%"
        v-loading="loading"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="id"
          label="测试用例编号"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="year"
          label="年份"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="month"
          width="120"
          label="月份"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="day"
          width="120"
          label="天"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="expectation"
          label="预期输出"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="actual"
          label="实际输出"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="info"
          label="程序运行信息"
          align="center"
        ></el-table-column>
        <el-table-column prop="state" label="测试结果" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state == true" class="icon-svg">
              <i class="el-icon-check"></i><span>测试通过</span>
            </div>
            <div v-if="scope.row.state == false" class="icon-svg">
              <i class="el-icon-close"></i><span>测试未通过</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="测试时间"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import mock_1_json from "@/mock/calendar/calendar_mock_1.json";
import mock_2_json from "@/mock/calendar/calendar_mock_2.json";
import mock_3_json from "@/mock/calendar/calendar_mock_3.json";

//import { testcalendar } from "@/api/calendartest.js";
export default {
  name: "SystemTest",
  components: {},
  props: ["parentHeight"],
  data() {
    return {
      options: [
        { value: "1", label: "边界值分析" },
        { value: "2", label: "等价类测试" },
        { value: "3", label: "决策表测试用例集测试" },
      ],
      value: "1",
      tableData: [],
      loading: false,
      classState: [],
    };
  },
  computed: {
    tableHeight(){
      return (this.parentHeight - 260) > 650 ? 650 : (this.parentHeight - 260);
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.reset(newVal);
      },
      immediate: false,
    },
  },
  created() {},
  mounted() {
    this.initTableData(mock_1_json);
  },
  methods: {
    initTableData(json) {
      this.classState = [];
      this.tableData = [];
      json.forEach((element) => {
        let newData = {};
        for (let key in element) {
          newData[key] = element[key];
        }
        newData["actual"] = "";
        newData["info"] = "";
        newData["time"] = "";
        this.tableData.push(newData);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      return this.classState[rowIndex];
    },

    reset(value) {
      if (value === "1") {
        this.initTableData(mock_1_json);
      } else if (value === "2") {
        this.initTableData(mock_2_json);
      }
      else if(value==="3")
      {
        this.initTableData(mock_3_json);
      }

    },
    is_leap_year( year)
    {
      if( (year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
      {
        return 1;
      }
      else {return 0;}

    },
    isValidDate(year, month, day) {
      if (year < 2000  || year > 2100 || month > 12 || day < 1) {
        return false;
      }

      var days_in_month = [0,31, 28 + this.is_leap_year(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return day <= days_in_month[month];
    },
    formatDate(year, month, day) {
      // 检查输入的年月日是否是合法日期
      if (this.isValidDate(year, month, day)) {
        // 使用padStart函数来确保月份和日期始终是两位数
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
        var formattedDate = year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        return formattedDate ;
      } else {
        return String(-1);
      }
    },
    doTest() {

      this.loading = true;
      for (let i = 0; i < this.tableData.length; i++) {
        var t1=performance.now();
        const data = this.tableData[i];
        const year = parseInt(data.year);
        const month = parseInt(data.month);
        const day = parseInt(data.day);

        const result = this.formatDate(year, month, day) ;
        data.actual = result;
        data.state = result === data.expectation;
        var t2=performance.now();
        data.time = t2-t1;
      }
      this.loading = false;
      this.$message({
        message: "测试成功",
        type: "success",
      });
    },

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
.main-button {
  width: 500px;
  margin-top: 10px;
}
.reset-button {
  width: 200px;
  margin-top: 10px;
}
.main-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:20px;
}
.main-table{
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
