<template>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#453568"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :default-openeds="openeds"
      router
      >
      <el-submenu index="1">
        <template slot="title">
          <span>课程练习</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/calendar">第2，10，11题：万年历问题</el-menu-item>
          <el-menu-item index="/triangle">第1，9题: 判断三角形</el-menu-item>
          <el-menu-item index="/problem03">第3题：销售管理系统</el-menu-item>
          <el-menu-item index="/problem04">第4题：电脑销售系统</el-menu-item>
          <el-menu-item index="/problem05">第5题：讨论题</el-menu-item>
          <el-menu-item index="/problem07">第7题：电信收费问题</el-menu-item>
          <el-menu-item index="/problem08">第8题：实时系统</el-menu-item>
          <el-menu-item index="/problem12">第12题：ATM状态图</el-menu-item>
          <el-menu-item index="/problem13">第13题：ERP系统</el-menu-item>
          <el-menu-item index="/problem14">第14题：实时Web系统</el-menu-item>
          <el-menu-item index="/problem16">第16题：构建程序图</el-menu-item>
          <el-menu-item index="/problem17">第17题：销售系统</el-menu-item>

          <!-- <el-menu-item index="/calendar">万年历问题</el-menu-item>
          <el-menu-item index="/sales">电脑销售系统</el-menu-item>
          <el-menu-item index="/two">第2题：销售管理系统</el-menu-item>
          <el-menu-item index="/four">第4题：讨论</el-menu-item>
          <el-menu-item index="/cash">第7题：电信收费问题</el-menu-item>
          <el-menu-item index="/seven">第7题：实时系统</el-menu-item>
          <el-menu-item index="/nine">第9题：ATM机</el-menu-item>
          <el-menu-item index="/ten">第10题：ERP系统</el-menu-item>
          <el-menu-item index="/eleven">第11题：实时Web系统</el-menu-item>
          <el-menu-item index="/twelve">第12题：构建程序图</el-menu-item>
          <el-menu-item index="/SevenTeen">第17题：销售系统</el-menu-item> -->

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>单元测试</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/unit">单元测试报告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
</template>

<script>

export default {
  name: "AsideBar",
  components: {},
  props: ['is-collapse'],
  data() {
    return {
      openeds: ['1'],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
};
</script>

<style scoped lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
