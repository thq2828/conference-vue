<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>更新人员</p>
        </div>
        <div class="add">
            <div class="a-input">
                <p class="b-chart">姓名：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">部门：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">职业：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">性别：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AddPersonnel',
        data() {
            return {}

        }
    }
</script>