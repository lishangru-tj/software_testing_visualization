<template>
    <div>
        <h1>用户中心模块</h1>
        <p>/friend(根据用户id获取好友列表)</p>
        <el-button><a :href="url + ':8081/api/friend?id=1147'" target="_blank">测试用例</a></el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // url: "http://60.204.153.135",
            url: "http://localhost",
        }
    }
}



</script>




<style scoped lang="less"></style>