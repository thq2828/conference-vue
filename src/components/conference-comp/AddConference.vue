<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>增加会议</p>
        </div>
        <div class="add">
            <div class="a-input">
                <p class="b-chart">标题：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">会议室：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">组织人员：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="a-input">
                <p class="b-chart">参会人员：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
            <template>
                <div class="block">
                    <span style="margin-left: 85px">时间范围：</span>
                    <el-date-picker
                            v-model="value3"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small"
                    style="margin-left: 68px">
                    </el-date-picker>
                </div>
            </template>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'AddConference',
        data() {
            return {}

        }
    }
</script>
