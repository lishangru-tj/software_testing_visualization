<template>
  <div>
    <span style="font-size:24px;"><b>&nbsp;第十三题</b></span>
    <div style="font-size:16px;">

      <p>下图是ERP系统的流图，根据系统需求和流程图，归纳出比较清晰的主、备选流关系图，并基于主、备选流设计场景和相应的测试用例。</p>
      <p> MPS（ Master Production Schedule），MRP(Manufacturing Resource Planning)</p>
      <img style="width:60%;height:60%;" src="./ten.png" />

      <p style="margin-top:100px;font-size:20px;">分析如下：</p>
    </div>
    <p>程序的基本流：</p>
    <p>根据销售合同制订计划需求，计算MPS，可用库存满足销售需求，销售发货管理，确认货是否发完，合同结案。</p>
    <p>备选流：</p>
    <p>1.可用库存不满足需求<br />

      2.没有可用库存<br />

      3.可用库存不满足生产需求<br />

      4.生产的货不合格<br />

      5.生产的货物是废品<br />

      6.生产的货物合格<br />

      7.采购的货不合格<br />

      8.货未发完<br />

      9.采购合格<br /></p>
    <p>根据基本流和备选流生成场景:</p>


    <el-table :data="questionData" style="width: 100%;font-size:12px;">
      <el-table-column prop="scenes" label="场景" width="140" align="center">
      </el-table-column>
      <el-table-column prop="one" label="one" width="240" align="center">
      </el-table-column>
      <el-table-column prop="two" label="two" align="center">
      </el-table-column>
      <el-table-column prop="three" label="three" align="center">
      </el-table-column>
      <el-table-column prop="four" label="four" width="240" align="center">
      </el-table-column>
      <el-table-column prop="five" label="five" width="240" align="center">
      </el-table-column>
      <el-table-column prop="six" label="six" width="240" align="center">
      </el-table-column>
      <el-table-column prop="seven" label="seven" width="240" align="center">
      </el-table-column>
    </el-table>

    <p style="margin-top:100px;">生成测试用例如下:</p>
    <el-table :data="resultData" style="width: 100%;font-size:12px;">
      <el-table-column prop="num" label="用例id" width="140" align="center">
      </el-table-column>
      <el-table-column prop="scenes" label="场景/条件" width="140" align="center">
      </el-table-column>
      <el-table-column prop="one" label="可用库存是否满足销售需求" width="240" align="center">
      </el-table-column>
      <el-table-column prop="two" label="是否有可用库存" align="center">
      </el-table-column>
      <el-table-column prop="three" label="可用库存是否满足生产需求" align="center">
      </el-table-column>
      <el-table-column prop="four" label="货物情况" width="240" align="center">
      </el-table-column>
      <el-table-column prop="five" label="采购货物情况" width="240" align="center">
      </el-table-column>
      <el-table-column prop="six" label="货是否发完" width="240" align="center">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  name: "SalesQuestion",
  components: {},
  props: {},
  data() {
    return {
      questionData: [{
        scenes: "场景1—合同成功结束",
        one: "基本流",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景2—可用库存不满足销售需求",
        one: "基本流",
        two: "备选流1",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景3—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，但生产的货物不合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流4",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景4—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，生产的货物是废品",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流5",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景5—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购的货物不合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流7",
        six: "",
        seven: "",
      },
      {
        scenes: "场景6—货未发完",
        one: "基本流",
        two: "备选流8",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景7—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，生产的货物合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流6",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景8—库存不满足销售需求，有可用库存但货未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流8",
        four: "",
        five: "",
        six: "",
        seven: "",
      },
      {
        scenes: "场景9—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，货物合格，但货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流6",
        five: "备选流8",
        six: "",
        seven: "",
      },
      {
        scenes: "场景10—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，货物不合格，且货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流4",
        five: "备选流8",
        six: "",
        seven: "",
      },
      {
        scenes: "场景11—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，货物为废品，且货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流5",
        five: "备选流8",
        six: "",
        seven: "",
      },
      {
        scenes: "场景12—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物合格，但货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流6",
        six: "备选流8",
        seven: "备选流9",
      },
      {
        scenes: "场景13—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物不合格，且货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流4",
        six: "备选流8",
        seven: "备选流9",
      },
      {
        scenes: "场景14—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物为废品，且货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流5",
        six: "备选流8",
        seven: "备选流9",
      },
      {
        scenes: "场景15—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物合格，但货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流6",
        six: "备选流7",
        seven: "备选流8",
      },
      {
        scenes: "场景16—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物不合格，且货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流4",
        six: "备选流7",
        seven: "备选流8",
      },
      {
        scenes: "场景17—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物为废品，且货物未发完",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流5",
        five: "备选流6",
        six: "备选流7",
        seven: "",
      },
      {
        scenes: "场景18—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流6",
        six: "备选流9",
        seven: "",
      },
      {
        scenes: "场景19—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物不合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流4",
        six: "备选流9",
        seven: "",
      },
      {
        scenes: "场景20—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物为废品",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流5",
        six: "备选流9",
        seven: "",
      },
      {
        scenes: "场景21—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流6",
        six: "备选流7",
        seven: "",
      },
      {
        scenes: "场景22—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物不合格",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流4",
        six: "备选流7",
        seven: "",
      },
      {
        scenes: "场景23—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物为废品",
        one: "基本流",
        two: "备选流1",
        three: "备选流2",
        four: "备选流3",
        five: "备选流5",
        six: "备选流7",
        seven: "",
      },

      ],
      resultData: [{
        num: "1",
        scenes: "场景1—合同成功结束",
        one: "是",
        two: "/",
        three: "/",
        four: "/",
        five: "/",
        six: "是",
      },
      {
        num: "2",
        scenes: "场景2—可用库存不满足销售需求",
        one: "否",
        two: "是",
        three: "/",
        four: "/",
        five: "/",
        six: "是",
      },
      {
        num: "3",
        scenes: "场景3—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，但生产的货物不合格",
        one: "否",
        two: "否",
        three: "是",
        four: "不合格",
        five: "/",
        six: "是",

      },
      {
        num: "4",
        scenes: "场景4—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，生产的货物是废品",
        one: "否",
        two: "否",
        three: "是",
        four: "废品",
        five: "/",
        six: "是",
      },
      {
        num: "5",
        scenes: "场景5—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购的货物不合格",
        one: "是",
        two: "是",
        three: "是",
        four: "合格",
        five: "不合格",
        six: "是",
      },
      {
        num: "6",
        scenes: "场景6—货未发完",
        one: "是",
        two: "/",
        three: "/",
        four: "/",
        five: "/",
        six: "否",
      },
      {
        num: "7",
        scenes: "场景7—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，生产的货物合格",
        one: "否",
        two: "否",
        three: "是",
        four: "合格",
        five: "/",
        six: "是",
      },
      {
        num: "8",
        scenes: "场景8—库存不满足销售需求，有可用库存但货未发完",
        one: "否",
        two: "是",
        three: "/",
        four: "/",
        five: "/",
        six: "否",
      },
      {
        num: "9",
        scenes: "场景9—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，货物合格，但货物未发完",
        one: "否",
        two: "否",
        three: "是",
        four: "合格",
        five: "/",
        six: "否",
      },
      {
        num: "10",
        scenes: "场景10—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，货物不合格，且货物未发完",
        one: "否",
        two: "否",
        three: "是",
        four: "不合格",
        five: "/",
        six: "否",
      },
      {
        num: "11",
        scenes: "场景11—可用库存不满足销售需求，没有可用库存，可用库存满足生产需求，货物为废品，且货物未发完",
        one: "否",
        two: "否",
        three: "是",
        four: "废品",
        five: "/",
        six: "否",
      },
      {
        num: "12",
        scenes: "场景12—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物合格，但货物未发完",
        one: "否",
        two: "否",
        three: "否",
        four: "合格",
        five: "合格",
        six: "否",
      },
      {
        num: "13",
        scenes: "场景13—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物不合格，且货物未发完",
        one: "否",
        two: "否",
        three: "否",
        four: "不合格",
        five: "合格",
        six: "否",
      },
      {
        num: "14",
        scenes: "场景14—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物为废品，且货物未发完",
        one: "否",
        two: "否",
        three: "否",
        four: "废品",
        five: "不合格",
        six: "否",
      },
      {
        num: "15",
        scenes: "场景15—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物合格，但货物未发完",
        one: "否",
        two: "否",
        three: "否",
        four: "合格",
        five: "不合格",
        six: "否",
      },
      {
        num: "16",
        scenes: "场景16—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物不合格，且货物未发完",
        one: "否",
        two: "否",
        three: "否",
        four: "不合格",
        five: "不合格",
        six: "否",
      },
      {
        num: "17",
        scenes: "场景17—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物为废品，且货物未发完",
        one: "否",
        two: "否",
        three: "否",
        four: "废品",
        five: "不合格",
        six: "否",
      },
      {
        num: "18",
        scenes: "场景18—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物合格",
        one: "否",
        two: "否",
        three: "否",
        four: "合格",
        five: "合格",
        six: "是",
      },
      {
        num: "19",
        scenes: "场景19—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物不合格",
        one: "否",
        two: "否",
        three: "否",
        four: "不合格",
        five: "合格",
        six: "是",
      },
      {
        num: "20",
        scenes: "场景20—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检合格，生产货物为废品",
        one: "否",
        two: "否",
        three: "否",
        four: "废品",
        five: "合格",
        six: "是",
      },
      {
        num: "21",
        scenes: "场景21—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物合格",
        one: "否",
        two: "否",
        three: "否",
        four: "合格",
        five: "不合格",
        six: "是",
      },
      {
        num: "22",
        scenes: "场景22—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物不合格",
        one: "否",
        two: "否",
        three: "否",
        four: "不合格",
        five: "不合格",
        six: "是",
      },
      {
        num: "23",
        scenes: "场景23—可用库存不满足销售需求，没有可用库存，可用库存不满足生产需求，采购质检不合格，生产货物为废品",
        one: "否",
        two: "否",
        three: "否",
        four: "废品",
        five: "不合格",
        six: "是",
      },
      ],
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less"></style>