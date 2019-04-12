<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <!--按钮区-->
        <div class="button">
            <form v-model="from">
                <div class="b-div">
                    <p class="b-chart">会议室：</p>
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
                <el-button type="success" native-type="submit" @click="meettingRoomAdd()">新增</el-button>

            </div>

        </div>
        <!--列表区-->
        <div class="list">
            <!--<table>-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<td>会议室名字</td>-->
                    <!--<td>地点</td>-->
                    <!--<td>操作</td>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="meettingRoom in meettingRooms">-->
                    <!--<td>{{meettingRoom.name}}</td>-->
                    <!--<td>{{meettingRoom.address}}</td>-->
                    <!--<td>-->
                        <!--<input type="button" value="编辑" @click="editorMeettingRoom(meettingRoom.id)" class="modify">-->
                        <!--<input type="button" value="删除" class="delete" @click="delMeettingRoom(meettingRoom.id)">-->
                    <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
            <el-table
                    :data="meettingRooms"
                    height="580"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass">
                <el-table-column

                        prop="name"
                        label="会议室名字"
                        width="360">
                </el-table-column>
                <el-table-column label="地点" >
                    <template slot-scope="scope" >
                        <span>{{scope.row.address}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                                @click="editorMeettingRoom(scope.row.id)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click="delMeettingRoom(scope.row.id)"
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
    import {getMeettingRooms, deleteMeettingRoom, getMeettingRoomsByName} from '../../request/api';

    export default {
        name: 'MeettingList',
        data() {

            return {

                //分页数据
                pageNum: sessionStorage.getItem("meettingRoomsPage") ? Number(sessionStorage.getItem("meettingRoomsPage")) : 1,
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
                //会议室的数据
                meettingRooms:null  ,
            }
        }
        , methods: {
            //搜索会议室的信息
            queryMeettingRooms(p) {
                getMeettingRooms({page: p}).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.meettingRooms = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.meettingRooms = res.data;
                    }
                })
            },
            //转换当前页的函数
            handleCurrentChange(val) {
                sessionStorage.setItem("meettingRoomsPage", val);
                this.queryMeettingRooms(val);
            },
            //搜索栏对应的函数
            search(from) {
                if(from){
                    from.name='';
                }
                getMeettingRoomsByName(from).then(res => {
                    if (res.code) {
                        this.code = res.code;
                        this.message = res.message;
                        this.meettingRooms = res.data;
                    }
                })
            },
            //重置函数
            reset() {
                this.queryMeettingRooms();
                //重置变量为空
                this.from.name = null;
            },
            //新增页面跳转
            meettingRoomAdd() {
                this.$router.push({path: '/addMeetting'});
            },
            //编辑页面跳转
            editorMeettingRoom(p) {
                sessionStorage.setItem("meettingRoomId", p);
                this.$router.push({path: '/editorMeetting'});
            },
            //删除
            delMeettingRoom(p) {
                this.$confirm('是否删除该会议室', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '再考虑下',
                    type: 'warning'
                }).then(() => {
                    deleteMeettingRoom(p).then(res => {
                        if (res.code) {
                            this.code = res.code;
                            this.message = res.message;
                            this.$confirm(this.message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'success'
                            }).then(() => {
                                this.queryMeettingRooms();
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
            this.queryMeettingRooms();
        }
    }
</script>