<template>
  <div id="app">
      <el-card>
  <span>逻辑用例<el-button
          class="main-button"
          type="success"
          plain
          @click="startTest"
          :loading="loading"
          style="margin-left: 400px;margin-bottom: 10px;"
          >进行测试<i class="el-icon-upload el-icon--right"></i
        ></el-button></span>
  <el-table
    :data="testCases"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="name"
      label="测试用例"
    ></el-table-column>
    <el-table-column
      prop="actions"
      label="用例细节"
    ></el-table-column>
    <el-table-column
      prop="expectedStatus"
      label="预期结果"
    ></el-table-column>
    <el-table-column
      prop="result"
      label="测试结果"
    >
    </el-table-column>
  </el-table>
</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTestCompleted: false,
      testResults: []
    };
  },
  computed: {
    testCases() {
      return [
        {
          name: '输入银行卡，卡片未识别',
          actions: ['Insert Card', 'Card Rejected'],
          expectedStatus: 'Card Rejected',
          result:null
        },
        {
          name: '输入正确的 PIN 后选择服务类型',
          actions: ['Insert Card', 'Enter correct PIN'],
          expectedStatus: 'Select Service Type',
          result:null
        },
        {
          name: '选择提款金额，余额充足',
          actions: ['Insert Card', 'Enter correct PIN', 'Select Withdrawal Amount','Check Balance', 'Sufficient Balance','Perform Withdrawal','Withdrawal Complete'],
          expectedStatus: 'Withdrawal Complete',
          result:null
        },
        {
          name: '选择提款金额，余额不足',
          actions: ['Insert Card', 'Enter correct PIN', 'Select Withdrawal Amount','Check Balance','Insufficient Balance'],
          expectedStatus: 'Insufficient Balance',
          result:null
        },
        {
          name: '提款完成后选择其他交易',
          actions: ['Insert Card', 'Enter correct PIN', 'Select Withdrawal Amount','Check Balance', 'Sufficient Balance','Perform Withdrawal','Withdrawal Complete','Return to Main Menu','Select Other Transaction'],
          expectedStatus: 'Select Other Transaction',
          result:null
        },
        {
          name: '输入错误的 PIN，卡片被锁定',
          actions: ['Insert Card', 'Enter Incorrect PIN'],
          expectedStatus: 'Card Locked',
          result:null
        }
      ];
    }
  },
  methods: {
    startTest() {
      this.testResults = [];
      let index = 0;

      for (const testCase of this.testCases) {
        const testName = testCase.name;
        const actions = testCase.actions;
        const expectedStatus = testCase.expectedStatus;
        const result = this.runTest(actions, expectedStatus);

        this.testCases[index].result = result ? '通过' : '未通过';
        console.log(this.testCases[index].result);

        this.testResults.push({
          name: testName,
          result: result ? '通过' : '未通过'
        });
        index++;
      }
      this.isTestCompleted = true;
    },

    runTest(actions, expectedStatus) {
      let currentStatus = 'Start';

      for (const action of actions) {
        const validActions = this.getValidActions(currentStatus);
        if (!validActions.includes(action)) {
          return false;
        }

        currentStatus = this.getNextStatus(currentStatus, action);
      }

      return currentStatus === expectedStatus;
    },

    getValidActions(currentStatus) {
      switch (currentStatus) {
        case 'Start':
          return ['Insert Card'];
        case 'Insert Card':
          return ['Card Rejected', 'Enter correct PIN', 'Enter Incorrect PIN'];
        case 'Enter correct PIN':
          return ['Select Service Type'];
        case 'Select Service Type':
          return ['Select Withdrawal Amount', 'Perform Deposit', 'Return to Main Menu'];
        case 'Select Withdrawal Amount':
          return ['Check Balance', 'Return to Main Menu'];
        case 'Check Balance':
          return ['Sufficient Balance', 'Insufficient Balance', 'Return to Main Menu'];
        case 'Sufficient Balance':
          return ['Perform Withdrawal', 'Return to Main Menu'];
        case 'Insufficient Balance':
          return ['End Transaction', 'Return to Main Menu'];
        case 'Perform Withdrawal':
          return ['Withdrawal Complete', 'Return to Main Menu'];
        case 'Withdrawal Complete':
          return ['End Transaction', 'Return to Main Menu'];
        case 'Perform Deposit':
          return ['Deposit Complete', 'Return to Main Menu'];
        case 'Deposit Complete':
          return ['End Transaction', 'Return to Main Menu'];
        case 'Return to Main Menu':
          return ['Select Other Transaction', 'End Transaction'];
        case 'Select Other Transaction':
          return ['Insert Card'];
        case 'End Transaction':
          return ['Insert Card'];
        case 'Card Rejected':
        case 'Enter Incorrect PIN':
        case 'Card Locked':
          return [];
        default:
          return [];
      }
    },

    getNextStatus(currentStatus, action) {
      switch (currentStatus) {
        case 'Start':
          return 'Insert Card';
        case 'Insert Card':
          if (action === 'Enter correct PIN') {
            return 'Select Service Type';
          } else if (action === 'Card Rejected') {
            return 'Card Rejected';
          }else if (action === 'Enter Incorrect PIN') {
            return 'Card Locked';
          }
          break;
        case 'Select Service Type':
          if (action === 'Select Withdrawal Amount' || action === 'Perform Deposit' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Select Withdrawal Amount':
          if (action === 'Check Balance' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Check Balance':
          if (action === 'Sufficient Balance' || action === 'Insufficient Balance' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Sufficient Balance':
          if (action === 'Perform Withdrawal' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Insufficient Balance':
          if (action === 'End Transaction' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Perform Withdrawal':
          if (action === 'Withdrawal Complete' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Withdrawal Complete':
          if (action === 'End Transaction' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Return to Main Menu':
          if (action === 'Select Other Transaction' || action === 'End Transaction') {
            return action;
          }
          break;
        case 'Select Other Transaction':
          if (action === 'Insert Card') {
            return 'Insert Card';
          }
          break;
        case 'Perform Deposit':
          if (action === 'Deposit Complete' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Deposit Complete':
          if (action === 'End Transaction' || action === 'Return to Main Menu') {
            return action;
          }
          break;
        case 'Enter Incorrect PIN':
          if (action === 'Re-enter PIN' || action === 'Card Locked') {
            return action;
          }
          break;
        case 'Re-enter PIN':
          if (action === 'Enter correct PIN' || action === 'Enter Incorrect PIN') {
            return action;
          }
          break;
        case 'Card Locked':
          if (action === 'End Transaction') {
            return action;
          }
          break;
        case 'Card Rejected':
          if (action === 'End Transaction') {
            return action;
          }
          break;
        case 'End Transaction':
          return 'Insert Card'; // Start a new round
        default:
          return currentStatus;
      }
    }
  }
};

</script>