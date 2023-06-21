<template>
  <div class="system-test">
    <div class="main-header">
      <el-select v-model="value" placeholder="请选择测试方法">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div class="button-group">
        <el-button class="main-button" type="success" plain @click="doTest" :loading="loading">进行测试<i
            class="el-icon-upload el-icon--right"></i></el-button>
        <el-button @click="reset(value)" class="reset-button" type="warning" plain>重置</el-button>
      </div>
    </div>
    <el-divider content-position="left">测试用例</el-divider>

    <div>
      <h6 >{{ introduce }}</h6>
    
    </div>
    <div class="main-table">
      <el-table :data="tableData" :height="tableHeight" border style="width: 100%;height: 100%;" v-loading="loading"
        :row-class-name="tableRowClassName">
        <el-table-column prop="测试用例" label="测试用例" width="50" align="center"></el-table-column>
        <el-table-column prop="销售额（百万元）" label="销售额（万元）" width="80" align="center"></el-table-column>
        <el-table-column prop="现金到帐（百分比）" label="现金到帐百分比" align="center"></el-table-column>
        <el-table-column prop="请假天数" label="请假天数" width="50" align="center"></el-table-column>
        <el-table-column prop="佣金系数" label="佣金系数" align="center"></el-table-column>
        <el-table-column prop="real_money" label="实际佣金(万元)" align="center">
        </el-table-column>
        <el-table-column prop="语句覆盖" label="语句覆盖" width="60" align="center"></el-table-column>
        <el-table-column prop="判断覆盖" label="判断覆盖" width="60" align="center"></el-table-column>
        <el-table-column prop="条件覆盖" label="条件覆盖" width="60" align="center"></el-table-column>
        <el-table-column prop="覆盖组合号" label="覆盖组合号" align="center"></el-table-column>
      </el-table>
    </div>
    <img id="5" src="./132.png" style="display: none;">
    <img src="./13.png"/>
  </div>
</template>

<script>
import mock_1_json from "@/mock/seventeen/thirteen_1.json";
import mock_2_json from "@/mock/seventeen/thirteen_2.json";
import mock_3_json from "@/mock/seventeen/thirteen_3.json";
import mock_4_json from "@/mock/seventeen/thirteen_4.json";
import mock_5_json from "@/mock/seventeen/thirteen_5.json";
export default {
  name: "SystemTest",
  components: {},
  props: ["parentHeight"],
  data() {
    return {
      options: [
        { value: "1", label: "语句覆盖", },
        { value: "2", label: "判断覆盖", },
        { value: "3", label: "条件覆盖", },
        { value: "4", label: "判断——条件覆盖", },
        { value: "5", label: "条件组合覆盖", },
      ],
      value: "1",
      tableData: [],
      loading: false,
      classState: [],
      json: {},
      introduce: "无条件语句的序列作为一个节点，对所有节点进行覆盖",
    };
  },
  computed: {
    tableHeight() {
      return (this.parentHeight - 260) > 700 ? 700 : (this.parentHeight - 260);
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.reset(newVal);
      },
      immediate: false,
    }
  },
  created() { },
  mounted() {
    this.initTableData(mock_1_json);
    this.json = mock_1_json;
  },
  methods: {
    initTableData(json) {
      this.tableData = [];
      json.forEach((element) => {
        let newData = {};
        for (let key in element) {
          if (key != "year" || key != "month") {
            if (key == "销售额（百万元）")
              newData[key] = element[key] * 100;
            else  if (key == "条件1:销售额>2.0")
              newData["1"] = element[key] ;
              else  if (key == "条件2:请假天数<=10")
              newData["2"] = element[key] ;
              else  if (key == "条件3:现金到帐>=60.0")
              newData["3"] = element[key] ;
            else newData[key] = element[key];
          }
        }
        newData["real_money"] = ""
        this.tableData.push(newData);
      });
      console.log(this.tableData)
    },
    tableRowClassName({ row, rowIndex }) {
      return this.classState[rowIndex];
    },
    doTest() {
      const _this = this;
      this.loading = true;
      _this.tableData.forEach((item, index) => {
        console.log(item["real_money"])
        
        if (item["佣金系数"] != "N/A")
          item["real_money"] = Math.floor(item["销售额（百万元）"] / item["佣金系数"] * 100) / 100;
        else item["real_money"] = 0
      });
      _this.loading = false;
    },
    reset(value) {
      if (value === "1") {
        this.json = mock_1_json;
        this.introduce = "语句覆盖:无条件语句的序列作为一个节点，对所有节点进行覆盖"
        document.getElementById("5").style.display="none"
        this.initTableData(mock_1_json);
      }
      else if (value === "2") {
        this.introduce = "判断覆盖:每个判断的真分支和假分支都至少经历一次"
        document.getElementById("5").style.display="none"
        this.json = mock_2_json;
        this.initTableData(mock_2_json);
      }
      else if (value === "3") {
        this.json = mock_3_json;
        document.getElementById("5").style.display="none"
        this.introduce = "条件覆盖:要使得每个判断中的每个条件的可能取值至少满足一次"
        this.initTableData(mock_3_json);
      } else if (value === "4") {
        this.json = mock_4_json;
        document.getElementById("5").style.display="none"
        this.introduce = "判断——条件覆盖:一个判定中的每个条件的所有可能结果至少执行一次，并且每个判断本身的所有可 能结果至少执行一次。"
        this.initTableData(mock_4_json);
      } else if (value === "5") {
        this.json = mock_5_json;
        document.getElementById("5").style.display=""
        this.introduce = "条件组合覆盖:一个判定中的每个条件的所有可能结果至少执行一次，并且每个判断本身的所有可 能结果至少执行一次。"
        this.initTableData(mock_5_json);
      }
    }
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
