<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <!--按钮区-->
        <div class="button">
            <form v-model="from">
                <div class="b-div" style="height: 60px  ">
                    <p class="b-chart">标题：</p>
                    <el-input class="b-input" v-model="from.title" placeholder="请输入内容" size="small"></el-input>
                </div>
                <div class="b-div">
                    <p class="b-chart">会议室：</p>
                    <template>
                        <el-select clearable :clear="clearSelectM(1)" size="small" v-model="meettingId"
                                   placeholder="请选择"
                                   style="margin-top: 28px">
                            <el-option
                                    v-for="meettingRoom in meettingRooms"
                                    :key="meettingRoom.id"
                                    :label="meettingRoom.name"
                                    :value="meettingRoom.id">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div class="b-div">
                    <p class="b-chart">组织人员：</p>
                    <template>
                        <el-select clearable :clear="clearSelectM(2)" :filterable=true size="small"
                                   v-model="personnelId" placeholder="请选择"
                                   style="margin-top: 28px">
                            <el-option
                                    v-for="personnel in personnels"
                                    :key="personnel.id"
                                    :label="personnel.name"
                                    :value="personnel.id">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div class="b-div">
                    <template>
                        <div class="block b-d-dtime">
                            <span>时间范围：</span>
                            <el-date-picker
                                    v-model="timeArr"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    size="small"
                            >
                            </el-date-picker>
                        </div>
                    </template>
                </div>
                <div class="b-query">
                    <div class="b-b-button" id="reset">
                        <el-button type="warning" plain @click="reset()">重置</el-button>
                    </div>
                    <div class="b-b-button">
                        <el-button class="b-b-button" type="primary" plain @click="search">搜索</el-button>
                    </div>
                </div>
            </form>
        </div>
        <!--标题区-->
        <div class="title">
            <div class="">

                <el-button type="success" native-type="submit" @click="conferenceAdd">新增</el-button>

            </div>
        </div>
        <!--列表区-->
        <div>
            <!--<table>-->
            <!--<thead>-->
            <!--<tr>-->
            <!--<td>序号</td>-->
            <!--<td class="thtd" @click="sort2(from)">会议标题 <i class="el-icon-d-caret"></i></td>-->
            <!--<td class="thtd" @click="sort3(from)">会议室 <i class="el-icon-d-caret"></i></td>-->
            <!--<td class="thtd" @click="sort4(from)">组织人员 <i class="el-icon-d-caret"></i></td>-->
            <!--<td class="thtd" @click="sort1(from)">时间 <i class="el-icon-d-caret"></i>-->
            <!--</td>-->
            <!--<td>操作</td>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="conference in conferences">-->
            <!--<td>1</td>-->
            <!--<td @click="conferenceDetails({conferenceId:conference.id,meettingId:conference.meettingId,personnelId:conference.personnelId})">-->
            <!--{{conference.title}}-->
            <!--</td>-->
            <!--<td @click="conferenceDetails({conferenceId:conference.id,meettingId:conference.meettingId,personnelId:conference.personnelId})">-->
            <!--{{conference.meettingRoom.name}}-->
            <!--</td>-->
            <!--<td @click="conferenceDetails({conferenceId:conference.id,meettingId:conference.meettingId,personnelId:conference.personnelId})">-->
            <!--{{conference.personnel.name}}-->
            <!--</td>-->
            <!--<td @click="conferenceDetails({conferenceId:conference.id,meettingId:conference.meettingId,personnelId:conference.personnelId})">-->
            <!--{{new Date(conference.startTime).toLocaleString()}} - {{new-->
            <!--Date(conference.endTime).toLocaleString()}}-->
            <!--</td>-->
            <!--<td>-->
            <!--<input type="button" value="编辑"-->
            <!--@click="editorConference({conferenceId:conference.id,meettingId:conference.meettingId,personnelId:conference.personnelId})"-->
            <!--class="modify">-->
            <!--<input type="button" value="删除" class="delete" @click="delConference(conference.id)">-->
            <!--</td>-->
            <!--</tr>-->
            <!--</tbody>-->
            <!--</table>-->

            <el-table
                    @sort-change="fun"
                    :data="conferences"
                    height="580"
                    border
                    style="width: 100%"
                    :header-cell-style="getRowClass"
            >
                <el-table-column
                        sortable="custom"
                        prop="title"
                        label="会议标题"
                        width="320">
                </el-table-column>
                <el-table-column label="会议室" sortable="custom" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.meettingRoom.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="组织人员" sortable="custom" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.personnel.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="时间" sortable="custom">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.startTime).toLocaleString()}}-{{new Date(scope.row.endTime).toLocaleString()}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" sortable="custom">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.createAt).toLocaleString()}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button
                                @click="editorConference({conferenceId:scope.row.id,meettingId:scope.row.meettingId,personnelId:scope.row.personnelId})"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click="delConference(scope.row.id)"
                                type="text"
                                size="small">
                            删除
                        </el-button>
                        <el-button
                                @click="conferenceDetails({conferenceId:scope.row.id,meettingId:scope.row.meettingId,personnelId:scope.row.personnelId})"
                                type="text"
                                size="small">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页区-->


        <div class="page">
            <div class="p-page">

                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {getConferences, getMeettingRooms, getPersonnels, deleteConference} from '../../request/api';

    export default {
        name: 'ConferenceList',
        data() {
            return {
                //列表数据
                conferences: '',
                //分页数据
                pageNum: null,
                //总条数
                totalCount: null,
                //每页显示的条数
                pageSize: null,
                //状态码
                code: null,
                //状态码对应的信息
                message: null,
                //搜索栏表单
                from: {
                    title: null,
                    meettingId: null,
                    personnelId: null,
                    startTime: null,
                    endTime: null,
                    sortStartTime: null,
                    sortMeettingId: null,
                    sortTitle: null,
                    sortPersonnelId: null,
                    sortCreateAt: null,
                },
                //会议室数据
                meettingRooms: null,
                //时间数据
                timeArr: null,
                //会议室的id
                meettingId: null,
                //人员数据
                personnels: null,
                //人员的id
                personnelId: null

            }
        },
        watch: {
            timeArr(newValue) {
                console.log(newValue)
            }
        },
        methods: {
            fun(row) {
                if (row.column.label === "会议标题") {
                    this.sort2(this.from)
                }
                if (row.column.label === "会议室") {
                    this.sort3(this.from)
                }
                if (row.column.label === "组织人员") {
                    this.sort4(this.from)
                }
                if (row.column.label === "时间") {
                    this.sort1(this.from)
                }
                if (row.column.label === "创建时间") {
                    this.sort5(this.from)
                }
            },
            //搜索会议
            queryConferences(page, size) {
                getConferences({page: page, size: size}).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                    }
                })
            },
            //路由跳转到新增页面
            conferenceAdd() {
                this.$router.push({path: '/addConference'});
            },
            //跳转到编辑页面函数
            editorConference(p) {
                sessionStorage.setItem("conferenceId", p.conferenceId);
                sessionStorage.setItem("personnelId", p.personnelId);
                sessionStorage.setItem("meettingRoomId", p.meettingId);
                this.$router.push({path: '/editorConference'});
            },
            delConference(p) {
                this.$confirm('是否删除该会议', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '再考虑下',
                    type: 'warning'
                }).then(() => {
                    deleteConference(p).then(res => {
                        if (res.code) {
                            this.code = res.code;
                            this.message = res.message;
                            this.$confirm(this.message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'success'
                            }).then(() => {
                                this.search();
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
            //转换当前页的函数
            handleCurrentChange(val) {
                this.pageNum = val;
                this.queryConferences(val, this.pageSize);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryConferences(this.pageNum, val);
            },


            //搜索栏对应的函数
            search() {
                if (this.personnelId) {
                    this.from.personnelId = this.personnelId
                }
                if (this.meettingId) {
                    this.from.meettingId = this.meettingId
                }
                if (this.timeArr) {
                    this.from.startTime = this.timeArr[0].getTime();
                    this.from.endTime = this.timeArr[1].getTime();
                } else {
                    this.from.startTime = null;
                    this.from.endTime = null;
                }


                getConferences(this.from).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                    }
                })
            },
            //重置函数
            reset() {
                this.queryConferences();
                //重置变量为空
                this.from.title = null;
                this.from.personnelId = null;
                this.from.meettingId = null;
                this.from.endTime = null;
                this.from.startTime = null;
                this.timeArr = null;
                this.meettingId = null;
                this.personnelId = null;
                sessionStorage.setItem("conferencePage", 1);
                this.pageNum = 1;
            },
            //查询会议室的信息
            queryMeettingRooms(p) {
                getMeettingRooms(p).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.meettingRooms = res.data;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.meettingRooms = res.data;
                    }
                })
            },
            //查询全部的人员信息
            queryPersonnels(p) {
                getPersonnels(p).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnels = res.data;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnels = res.data;
                    }
                })
            },
            //详情页面
            conferenceDetails(p) {
                sessionStorage.setItem("conferenceId", p.conferenceId);
                sessionStorage.setItem("personnelId", p.personnelId);
                sessionStorage.setItem("meettingRoomId", p.meettingId);
                this.$router.push({path: '/conferenceDetail'});
            },

            /**
             * 排序区，可以封装
             * @param from
             */
            sort1(from) {
                if (from.sortStartTime === 0) {
                    from.sortStartTime = 1;
                    this.from.sortMeettingId = null;
                    this.from.sortTitle = null;
                    this.from.sortPersonnelId = null;
                    this.from.sortCreateAt = null;
                } else {
                    from.sortStartTime = 0;
                    this.from.sortMeettingId = null;
                    this.from.sortTitle = null;
                    this.from.sortPersonnelId = null;
                    this.from.sortCreateAt = null;
                }
                getConferences(from).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                    }
                })
            }, sort2(from) {
                if (from.sortTitle === 4) {
                    from.sortTitle = 7;
                    this.from.sortStartTime = null;
                    this.from.sortMeettingId = null;
                    this.from.sortPersonnelId = null;
                    this.from.sortCreateAt = null;

                } else {
                    from.sortTitle = 4;
                    this.from.sortStartTime = null;
                    this.from.sortMeettingId = null;
                    this.from.sortPersonnelId = null;
                    this.from.sortCreateAt = null;

                }
                getConferences(from).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                    }
                })
            },
            sort3(from) {
                if (from.sortMeettingId === 2) {
                    from.sortMeettingId = 5;
                    this.from.sortStartTime = null;
                    this.from.sortPersonnelId = null;
                    this.from.sortTitle = null;
                    this.from.sortCreateAt = null;

                } else {
                    from.sortMeettingId = 2;
                    this.from.sortStartTime = null;
                    this.from.sortPersonnelId = null;
                    this.from.sortTitle = null;
                    this.from.sortCreateAt = null;

                }
                getConferences(from).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                    }
                })
            }, sort4(from) {
                if (from.sortPersonnelId === 3) {
                    from.sortPersonnelId = 6;
                    this.from.sortStartTime = null;
                    this.from.sortTitle = null;
                    this.from.sortMeettingId = null;
                    this.from.sortCreateAt = null;

                } else {
                    from.sortPersonnelId = 3;
                    this.from.sortStartTime = null;
                    this.from.sortTitle = null;
                    this.from.sortMeettingId = null;
                    this.from.sortCreateAt = null;

                }

                getConferences(from).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;

                    }
                })
            },
            sort5(from) {
                if (from.sortCreateAt === 8) {
                    from.sortCreateAt = 9;
                    this.from.sortStartTime = null;
                    this.from.sortTitle = null;
                    this.from.sortMeettingId = null;
                    this.from.sortPersonnelId = null;
                } else {
                    from.sortCreateAt = 8;
                    this.from.sortStartTime = null;
                    this.from.sortTitle = null;
                    this.from.sortMeettingId = null;
                    this.from.sortPersonnelId = null;

                }

                getConferences(from).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                        this.totalCount = res.totalRecord;
                        this.pageNum = res.pageNum;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conferences = res.data;
                    }
                })
            },
            /**
             * 选择器清空问题
             *
             */
            clearSelectM(val) {
                if (val === 1) {
                    this.from.meettingId = null;
                }
                if (val === 2) {
                    this.from.personnelId = null;
                }
            },
            //表头样式
            getRowClass(){
                return'background:#F5F7FA'
            }


        },
        //钩子函数，由于在刷新页面时执行
        mounted() {
            //默认获取的会议列表
            this.queryConferences();
            //查询会议室全部的信息
            this.queryMeettingRooms({size: this.constant.SIZE_MAX});
            this.queryPersonnels({size: this.constant.SIZE_MAX})
        },
    }
</script>
