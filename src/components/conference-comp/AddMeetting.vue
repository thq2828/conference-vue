<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>增加人员</p>
        </div>
        <div class="add">
            <div class="a-input">
                <p class="b-chart">会议室名：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">地址：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'AddMeetting',
        data() {
            return {}

        }
    }
</script>