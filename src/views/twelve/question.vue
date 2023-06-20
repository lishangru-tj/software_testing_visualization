<template>
    <div>
        <span style="font-size:24px;"><b>&nbsp;第十二题＆十五题</b></span>
      <div style="font-size:16px;">
        <p >分析或查阅得到正确的ATM的系统状态图，再基于state transition testing分析出transition tree，最后设计出逻辑测试用例。</p>
      </div>
      <el-card>
        <p style="margin-top:20px;font-size:20px;">查阅所得状态图：</p> 
        <img src=".\stateDiagram.png" alt="">
      </el-card>
      <el-card>
        <p style="margin-top:20px;font-size:20px;">建立transition tree：</p> 
        <div class="tree">
          <div class="node">初始状态 (Start)</div>
          <div class="node">输入银行卡 (Insert Card)
            <div class="node">输入正确的 PIN (Enter PIN)
              <div class="node">选择账户类型 (Select Account Type)
                <div class="node">选择取款金额 (Select Withdrawal Amount)
                  <div class="node">检查余额 (Check Balance)
                    <div class="node">余额充足 (Sufficient Balance)
                      <div class="node">执行取款 (Perform Withdrawal)</div>
                      <div class="node">取款完成 (Withdrawal Complete)</div>
                    </div>
                    <div class="node">余额不足 (Insufficient Balance)
                      <div class="node">结束操作 (End Transaction)</div>
                    </div>
                  </div>
                </div>
                <div class="node">返回主菜单 (Return to Main Menu)
                  <div class="node">选择其他操作 (Select Other Transaction)</div>
                  <div class="node">结束操作 (End Transaction)</div>
                </div>
              </div>
              <div class="node">执行存款 (Perform Deposit)</div>
              <div class="node">存款完成 (Deposit Complete)</div>
            </div>
            <div class="node">输入错误的 PIN (Enter Incorrect PIN)
              <div class="node">重新输入 PIN (Re-enter PIN)</div>
              <div class="node">锁定卡片 (Card Locked)</div>
            </div>
          </div>
          <div class="node">卡片被拒绝 (Card Rejected)
            <div class="node">结束操作 (End Transaction)</div>
          </div>
        </div>
      </el-card>
      
    </div>

</template>

<script>

export default {
  name: "ATMQuestion",
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
    .tree {
      font-family: Arial, sans-serif;
      line-height: 1.5;
    }
    
    .node {
      position: relative;
      margin-left: 20px;
    }
    
    .node:before {
      content: '';
      position: absolute;
      top: 0;
      left: -10px;
      border-left: 1px solid black;
      height: 100%;
    }
    
    .node:last-child:before {
      height: 50%;
    }
    
    .node:not(:last-child):after {
      content: '';
      position: absolute;
      top: 50%;
      left: -10px;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
      width: 10px;
    }

</style>
