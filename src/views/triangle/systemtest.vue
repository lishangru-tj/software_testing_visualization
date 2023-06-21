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
    <div v-if="value=='1'">
      <p>设abc的基本边界（最小值，略高于最小值、正常值、略低于最大值和最大值）分别为：1，2，100，199，200</p>
      <p>设abc的健壮性边界（略超过最大值，略小于最小值）： 201， 0</p>
    </div>
    <div v-else>
      <p>根据输出结果划分4个等价类:</p>
      <p>R1= {(a, b, c):有三条边a, b和c的等边三角形}
      R2= {(a, b, c):有三条边a,b和 c的等腰三角形}
      R3={(a, b, c):有三条边a, b和c的不等边三角形}
      R4={(a, b, c):三条边a, b和c不构成三角形}</p>
      <p>然后再从输入变量入手，设计出额外弱健壮测试用例.本题使用弱健壮等价类,其中弱─般等价类4个测试用例,额外弱健壮测试用例为 6 个</p>
    </div>
    <el-divider content-position="left">测试用例</el-divider>

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
          prop="A"
          label="第一条边的值（a）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="B"
          label="第二条边的值（b）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="C"
          label="第三条边的值（c）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="expectation"
          label="程序预期输出"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="actual"
          label="程序实际输出"
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
import mock_1_json from "@/mock/triangle/triangle_mock_1.json";
import mock_2_json from "@/mock/triangle/triangle_mock_2.json";
export default {
  name: "SystemTest",
  components: {},
  props: ["parentHeight"],
  data() {
    return {
      options: [
        { value: "1", label: "健壮性边界分析" },
        { value: "2", label: "等价类法" },
      ],
      value: "1",
      tableData: [],
      loading: false,
      classState: [],
      inputData: {
        triangle_test_list: mock_1_json,
      },
    };
  },
  computed: {
    tableHeight() {
      return this.parentHeight - 260 > 700 ? 700 : this.parentHeight - 260;
    },
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
    testTriangle(a, b, c) {
      a = parseInt(a);
      b = parseInt(b);
      c = parseInt(c);
      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0|| a > 200 || b > 200 || c > 200)
        return '输入非法';
      else if (a + b <= c || b + c <= a || a + c <= b)
        return '不构成三角形';
      else if (a === b && b === c)
        return '等边三角形';
      else if (a === b || b === c|| a === c) 
        return '等腰三角形';
      else
        return '一般三角形';
    },
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
        newData["state"] = null;
        newData["time"] = null;
        this.tableData.push(newData);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      return this.classState[rowIndex];
    },
    doTest() {
      this.loading = true;
      for (let i = 0; i < this.tableData.length; i++) {
        const data = this.tableData[i];
        const a = parseInt(data.A);
        const b = parseInt(data.B);
        const c = parseInt(data.C);
        const result = this.testTriangle(a, b, c);
        data.actual = result;
        data.state = result === data.expectation;
        data.time = performance.now();
      }
      this.loading = false;
    },

    reset(value) {
      if (value === "1") {
        this.initTableData(mock_1_json);
        this.inputData = {
          triangle_test_list: mock_1_json,
        };
      } else if (value === "2") {
        this.initTableData(mock_2_json);
        this.inputData = {
          triangle_test_list: mock_2_json,
        };
      }
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
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.main-table {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
