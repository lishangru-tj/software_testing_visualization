<template>
  <div id="app">
    <el-card>
      <div class="atm-screen">
        <h2>ATM机状态: {{ currentStatus }}</h2>
        <p>可执行操作:</p>
        <ul>
          <li v-for="action in getAvailableActions(currentStatus)" :key="action">
            <button @click="performAction(action)">{{ action }}</button>
          </li>
        </ul>
      </div>
    </el-card>

    <el-card v-if="currentStatus !== 'End Transaction' || statusHistory.length > 0">
      <h2>操作</h2>
      <button v-for="action in getAvailableActions(currentStatus)" :key="action" @click="performAction(action)">{{ action }}</button>
    </el-card>

    <el-card>
      <h2>状态转换记录</h2>
      <ul>
        <li v-for="statusChange in statusHistory" :key="statusChange.action">
          从状态 <strong>{{ statusChange.fromStatus }}</strong> 到状态 <strong>{{ statusChange.toStatus }}</strong>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStatus: 'Start',
      statusHistory: []
    };
  },
  methods: {
    getAvailableActions(status) {
      switch (status) {
        case 'Start':
          return ['Insert Card'];
        case 'Insert Card':
          return ['Card Rejected','Enter correct PIN','Enter Incorrect PIN'];
        case 'Enter correct PIN':
          return ['Select Service Type'];
        case 'Select Service Type':
          return ['Select Withdrawal Amount',  'Perform Deposit','Return to Main Menu'];
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
        case 'Return to Main Menu':
          return ['Select Other Transaction', 'End Transaction'];
        case 'Select Other Transaction':
          return ['Insert Card'];
        case 'Perform Deposit':
          return ['Deposit Complete','Return to Main Menu'];
        case 'Deposit Complete':
          return ['End Transaction','Return to Main Menu'];
        case 'Enter Incorrect PIN':
          return ['Re-enter PIN', 'Card Locked'];
        case 'Re-enter PIN':
          return ['Enter correct PIN','Enter Incorrect PIN'];
        case 'Card Locked':
          return ['End Transaction'];
        case 'Card Rejected':
          return ['End Transaction'];
        default:
          return [];
      }
    },
    performAction(action) {
      const fromStatus = this.currentStatus;
      this.currentStatus = this.getNextStatus(this.currentStatus, action);
      const toStatus = this.currentStatus;
      this.statusHistory.push({ fromStatus, toStatus, action });
    },
    getNextStatus(currentStatus, action) {
      switch (currentStatus) {
        case 'Start':
          return 'Insert Card';
        case 'Insert Card':
          if (action === 'Enter correct PIN') {
            return 'Enter correct PIN';
          } else if (action === 'Card Rejected') {
            return 'Card Rejected';
          }
          break;
        case 'Enter correct PIN':
          if (action === 'Select Service Type') {
            return 'Select Service Type';
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

<style scoped lang="less">
.atm-screen {
  padding: 20px;
  background-color: #f2f2f2;
}

button {
  margin-right: 10px;
}
</style>
