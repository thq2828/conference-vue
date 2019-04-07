<template>
    <!--版权区-->

    <!--导航区-->
    <div class="navigation">
        <el-row class="tac">
            <el-col :span="12" class="e-cl">
                <el-menu
                        router="true"
                        default-active="2"
                        class="el-menu-vertical-demo"
                        background-color="#253544"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航</span>
                        </template>
                        <el-menu-item index="/first" >首页</el-menu-item>
                        <el-menu-item index="/conferenceList">会议管理</el-menu-item>
                        <el-menu-item index="/personnelList" >人员管理</el-menu-item>
                        <el-menu-item index="/meettingList" >会议室管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    export default {
        name: 'Navigation2',
        methods: {}
    }


</script>
