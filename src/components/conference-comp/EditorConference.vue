<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>更新会议</p>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="80px" :model=conference>
                <el-form-item label="标题" class="add">
                    <el-input v-model="conference.title"></el-input>
                </el-form-item>
                <el-form-item label="会议室" class="add">
                    <template>
                        <el-select  v-model="meettingId">
                            <el-option
                                    v-for="meettingRoom in meettingRooms"
                                    :key="meettingRoom.id"
                                    :label="meettingRoom.name"
                                    :value="meettingRoom.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="组织人员" class="add">
                    <template>
                        <el-select :filterable=true v-model="personnelId"
                        >
                            <el-option
                                    v-for="personnel in personnels"
                                    :key="personnel.id"
                                    :label="personnel.name"
                                    :value="personnel.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="参会人员" class="add">
                    <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                        <template>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="personnel in personnels" :label="personnel.id"
                                             :key="personnel.id">{{personnel.name}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </template>
                        <el-button slot="reference">选取参会人员</el-button>
                    </el-popover>
                </el-form-item>
                <template>
                    <div class="block add">
                        <span>时间范围：</span>
                        <el-date-picker
                                v-model="timeArr"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                size="small"
                                style="margin-left: 10px"
                                :picker-options="pickerOptions0"
                        >
                        </el-date-picker>
                    </div>
                </template>
                <el-row>
                    <el-col :xs="24" :sm="24" style="text-align: center;margin-top: 30px">
                        <el-button
                                size="medium" type="danger" @click="cancel()">取消
                        </el-button>
                        <el-button size="medium" type="success" @click="cheackUser(conference)">保存
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {
        getMeettingRooms,
        getPersonnels,
        getConference,
        editorConference,
        getMeettingRoom,
        getPersonnel,
        createConference, createConference1
    } from '../../request/api';

    export default {
        name: 'EditorConference',
        data() {
            return {
                labelPosition: 'left',

                //选人组件
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true,

                //人员ids
                personnelsIds: [],
                //人员名字数组
                personnelsName: [],


                //会议表单
                // from: {
                //     id: null,
                //     title: null,
                //     meettingId: null,
                //     personnelId: null,
                //     startTime: null,
                //     endTime: null,
                //     personnelIds: null,
                // },
                //会议室数据
                meettingRooms: [],
                //人员数据
                personnels: [],
                //会议室id
                meettingId: '',
                //组织人员id
                personnelId: '',
                //时间数据
                timeArr: [],
                //编辑的信息
                conference: {},
                startTime: null,
                endTime: null,
                code: null,
                message: null,
                conferenceP: [],
                personnel: '',
                meettingRoom: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }

        }, methods: {
            submitForm(from) {
                createConference(from).then(res => {
                        if (res.code === 1) {
                            this.$confirm(res.message, '提示', {
                                    confirmButtonText: '确定',
                                    showCancelButton: false,
                                    type: 'success'
                                }
                            ).then(() => {
                                this.$router.push({path: '/conferenceList'})
                            })
                        } else {
                            this.code = res.code;
                            this.message = res.message;
                            this.$confirm(this.message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'error'
                            })
                        }
                    }
                )
            },
            cheackUser(from) {
                from.meettingId = this.meettingId;
                from.personnelId = this.personnelId;
                // from.startTime = this.timeArr[0];
                // from.endTime = this.timeArr[1];
                from.startTime = new Date(this.timeArr[0]).getTime();
                from.endTime = new Date(this.timeArr[1]).getTime();
                from.personnelIds = this.checkedCities;
                createConference1(from).then(res => {
                    if (res.code === 300) {
                        res.data.conferPer.forEach(e => {
                            this.conferenceP.push(e.name);
                        });
                        this.$confirm(this.conferenceP + res.message, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: "取消",
                                type: 'success'
                            }
                        ).then(() => {
                            this.submitForm(from);
                        })
                    } else if (res.code === 1) {
                        this.submitForm(from);
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.$confirm(this.message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        })
                    }
                })
            },
            warrning() {
                this.$message({
                    showClose: true,
                    message: this.conferenceP + "人员这段时间有参加的会议，请合理安排时间!!!",
                    type: 'warning'
                });
            },


            //取消
            cancel() {
                this.$confirm('确定取消编辑文章内容？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$router.push({path: '/conferenceList'})
                }).catch(() => {
                });
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
                    if (this.personnels) {
                        for (let i = 0; i < this.personnels.length; i++) {
                            this.personnelsIds[i] = this.personnels[i].id;
                        }
                    }
                })
            },
            //查询会议详情
            queryConference(p) {
                getConference(p).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conference = res.data;
                        this.timeChange(this.conference.startTime, this.conference.endTime);
                        this.checkedCities = this.conference.personnelIds;
                        this.meettingId=this.conference.meettingId;
                        this.personnelId=this.conference.personnelId;
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conference = res.data;
                    }
                })
            },
            //时间戳转换
            timeChange(startTime, endTime) {

                this.timeArr = [startTime, endTime];
            },

            //选人组件全选函数
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.personnelsIds : [];
                this.isIndeterminate = false;
            },
            //选人组件单选函数
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.personnels.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.personnels.length;
            },
            //获取单个人员信息
            queryPersonnel(p) {
                getPersonnel(p).then(res => {
                    if (res.code) {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnel = res.data;
                    }
                })
            },
            //获取会议室详情
            queryMeettingRoom(p) {
                getMeettingRoom(p).then(res => {
                    if (res.code) {
                        this.code = res.code;
                        this.message = res.message;
                        this.meettingRoom = res.data;
                    }
                })
            }
        },

        mounted() {
            this.queryMeettingRooms({size: this.constant.SIZE_MAX});
            this.queryPersonnels({size: this.constant.SIZE_MAX});
            this.queryConference(sessionStorage.getItem("conferenceId"));
            this.queryMeettingRoom(sessionStorage.getItem("meettingRoomId"));
            this.queryPersonnel(sessionStorage.getItem("personnelId"));
        }
    }
</script>
