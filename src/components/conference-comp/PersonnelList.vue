<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <!--按钮区-->
        <div class="button">
            <form v-model="from">
                <div class="b-div">
                    <p class="b-chart">姓名：</p>
                    <el-input class="b-input" v-model="from.name" placeholder="请输入内容" size="small"></el-input>
                </div>
                <div class="b-query">
                    <div class="b-b-button" id="reset">
                        <el-button type="warning" plain @click="reset()">重置</el-button>
                    </div>
                    <div class="b-b-button">
                        <el-button class="b-b-button" type="primary" plain @click="search(from)">搜索</el-button>
                    </div>
                </div>
            </form>
        </div>

        <!--标题区-->
        <div class="title">
            <div class="">
                <el-button type="success" native-type="submit" @click="personnelAdd()">新增</el-button>

            </div>
        </div>
        <!--列表区-->
        <div class="list">
            <!--<table>-->
            <!--<thead>-->
            <!--<tr>-->
            <!--<td>姓名</td>-->
            <!--<td>部门</td>-->
            <!--<td>职业</td>-->
            <!--<td>性别</td>-->
            <!--<td>操作</td>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="personnel in personnels">-->
            <!--<td>{{personnel.name}}</td>-->
            <!--<td>{{personnel.department}}</td>-->
            <!--<td>{{personnel.profession}}</td>-->
            <!--<td>{{personnel.sex===1?'男':'女'}}</td>-->
            <!--<td>-->
            <!--<input type="button" value="编辑" @click="editorPersonnel(personnel.id)" class="modify">-->
            <!--<input type="button" value="删除" class="delete" @click="delPersonnel(personnel.id)">-->
            <!--</td>-->
            <!--</tr>-->
            <!--</tbody>-->
            <!--</table>-->
            <el-table
                    :data="personnels"
                    height="580"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="160">
                </el-table-column>
                <el-table-column label="部门">
                    <template slot-scope="scope">
                        <span>{{scope.row.department}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="职业">
                    <template slot-scope="scope">
                        <span>{{scope.row.profession}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="性别" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex===1?'男':'女'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button
                                @click="editorPersonnel(scope.row.id)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click="delPersonnel(scope.row.id)"
                                type="text"
                                size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页区-->
        <div class="page">
            <div class="p-page">
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="totalCount"
                        :page-size=10
                        :page-count="pageNum"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {getPersonnels, getPersonnelByName, deletePersonnel} from '../../request/api';

    export default {
        name: 'PersonnelList',
        data() {
            return {
                //分页数据
                pageNum: sessionStorage.getItem("personnelPage") ? Number(sessionStorage.getItem("personnelPage")) : 1,
                //总条数
                totalCount: null,
                //状态码
                code: '',
                //状态码对应的信息
                message: '',
                //搜索栏表单
                from: {
                    name: null,
                },
                //人员数据
                personnels: '',

            }
        }
        , methods: {
            //搜索人员表的信息
            queryPersonnels(p) {
                getPersonnels({page: p}).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnels = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnels = res.data;
                    }
                })
            },
            //转换当前页的函数
            handleCurrentChange(val) {
                sessionStorage.setItem("personnelPage", val);
                this.queryPersonnels(val);
            },
            //搜索栏对应的函数
            search(from) {
                getPersonnelByName(from).then(res => {
                    if (res.code) {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnels = res.data;
                    }
                })
            },
            //重置函数
            reset() {
                this.queryPersonnels();
                //重置变量为空
                this.from.name = null;
            },
            //新增页面跳转
            personnelAdd() {
                this.$router.push({path: '/addPersonnel'});
            },
            //编辑页面跳转
            editorPersonnel(p) {
                sessionStorage.setItem("personnelId", p);
                this.$router.push({path: '/editorPersonnel'});
            },
            //删除
            delPersonnel(p) {
                this.$confirm('是否删除该人员', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '再考虑下',
                    type: 'warning'
                }).then(() => {
                    deletePersonnel(p).then(res => {
                        if (res.code) {
                            this.code = res.code;
                            this.message = res.message;
                            this.$confirm(this.message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'success'
                            }).then(() => {
                                this.queryPersonnels();
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            //表头样式
            getRowClass(){
                return'background:#F5F7FA'
            }

        }, mounted() {
            this.queryPersonnels();
        }
    }

</script>