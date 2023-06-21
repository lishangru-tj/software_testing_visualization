<template>
  <div>
    <span style="font-size: 24px"><b>&nbsp;万年历问题</b></span>
    <div style="font-size: 17px">
      <p>在本题中，我们需要根据输入的年月日三个正整数变量，要求年份在2000-2100之间，
        若该日期是一个合法日期，则以"yyyy-mm-dd"的形式输出该日期的下一天，
        若该日期不是一个合法日期，则应输出-1.
      </p>
      <h3>1.边界值分析</h3>
      <p>基本边界值测试用例13个</p>
      <p>year(2000-2100)的基本边界（最小值，略高于最小值、正常值、略低于最大值和最大值）分别为: 2000, 2001, 2020, 2099, 2100</p>
      <p>Month的基本边界（最小值，略高于最小值、正常值、略低于最大值和最大值）: 1(31), 2(28/29), 6(30), 11(30), 12(31)</p>
      <p>Day的基本边界（最小值，略高于最小值、正常值、略低于最大值和最大值）: 1, 2, 14, 30, 31</p>


      <img src="./tupian/img.png">
      <p>健壮性边界测试用例：6个</p>
      <p> D的健壮性边界（略小于最小值，略超过最大值）: 0, 29</p>
      <p> M的健壮性边界（略小于最小值，略超过最大值）: 0, 13</p>
      <p>Y的健壮性边界（略小于最小值，略超过最大值）: -1，1999, 2101</p>

      <img src="./tupian/img_1.png" >
      <p>
        考虑到一些跨年和平闰年2月天数的特殊性，增加了一些额外补充测试用例：5个
      </p>
      <img src="./tupian/img_2.png" >
      <h3>2.等价类方法</h3>
      <p>
        <br>
        有效等价类：
        <br>
        year：{year = 平年}，{year = 闰年}
        <br>
        month：{month = 31日月}，{month = 30日月}，{month = 2月}
        <br>
        day:{1<=day<=28}，{day = 29}，{day = 30}，{day = 31}
        <br>
        无效等价类：
        <br>
        year：{year < 2000}，{year > 2100}
        <br>
        month：{month < 1}, {month > 12}
        <br>
        day: {day < 1}, {day > 31}
        <br>
        强一般等价类测试用例 24个
        <br>
      </p>
      <img src="./tupian/img_3.png" >

      <p>
        <br>
        额外弱健壮部分的测试用例：6个
        <br>
      </p>
      <img src="./tupian/img_4.png" >
      <h3>3.扩展决策表</h3>
      <p>
        条件：Y年份、M月份、D日期
        <br>
        Y1:{平年}; Y2:{闰年}
        <br>
        M1:{1,3,5,7,8,10}; M2:{4,6,9,11}; M3:{2}; M4:{12}
        <br>
        D1:{1-27}; D2:{28}; D3:{29}; D4:{30}; D5:{31}
        <br>
        行动：
        <br>
        A1: 输入无效
        <br>
        A2:本年本月的下一天
        <br>
        A3: 输出本年下个月第一天
        <br>
        A4: 输出下一年的1月1日
        <br>
        扩展决策表
        <br>
      </p>
      <img src="./tupian/img_5.png" >
      <p>
        测试用例集13个测试用例：
    </p>
      <img src="./tupian/img_6.png" >

    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarQuestion",
  components: {},
  props: {},
  data() {
    return {
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
</style>
