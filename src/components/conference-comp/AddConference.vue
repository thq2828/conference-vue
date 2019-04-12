<template>
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>增加会议</p>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="100px" :model="from" :rules="rules">
                <el-form-item label="标题" class="add" prop="title">
                    <el-input v-model="from.title"></el-input>
                </el-form-item>
                <el-form-item label="会议室" class="add" prop="meettingId">
                    <template>
                        <el-select  v-model="from.meettingId" placeholder="请选择">
                            <el-option
                                    v-for="meettingRoom in meettingRooms"
                                    :key="meettingRoom.id"
                                    :label="meettingRoom.name"
                                    :value="meettingRoom.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="组织人员" class="add" prop="personnelId">
                    <template>
                        <el-select  :filterable=true v-model="from.personnelId" placeholder="请选择">
                            <el-option
                                    v-for="personnel in personnels"
                                    :key="personnel.id"
                                    :label="personnel.name"
                                    :value="personnel.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="参会人员" class="add" prop="checkedCities">
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
                    <span>
                        <el-tag
                                v-for="c in checkedCities"
                                :key="c"
                                closable
                                :type="''"
                                style="margin-left:5px">
                                {{c}}
                        </el-tag>
                    </span>
                </el-form-item>
                <el-form-item label="时间范围" class="add" prop="timeArr">
                    <template>
                        <div class="block">
                            <el-date-picker
                                    v-model="timeArr"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions0"
                            >
                            </el-date-picker>
                        </div>
                    </template>
                </el-form-item>
                <el-row>
                    <el-col :xs="24" :sm="24" style="text-align: center;margin-top: 30px">
                        <el-button
                                size="medium" type="danger" @click="cancel()">取消
                        </el-button>
                        <el-button size="medium" type="success" @click="cheackUser(from)">保存
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {createConference, getMeettingRooms, getPersonnels, createConference1} from '../../request/api';

    export default {

        name: 'AddConference',
        data() {
            return {
                labelPosition: 'left',
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true,


                //会议表单
                from: {
                    title: null,
                    meettingId: null,
                    personnelId: null,
                    startTime: null,
                    endTime: null,
                    personnelIds: null,
                },
                rules: {
                    title: [
                        {required: true, message: '请输入会议的标题', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 18 个字符', trigger: 'change'}
                    ],
                    meettingId: [
                        {required: true, message: '请选择会议室', trigger: 'change'}
                    ],
                    personnelId: [
                        {required: true, message: '请选择组织人员', trigger: 'change'}
                    ]
                },


                //会议室数据
                meettingRooms: null,
                //人员数据
                personnels: null,
                //人员ids
                personnelsIds: [],
                //会议室id
                meettingId: null,
                //组织人员id
                personnelId: null,
                //时间数据
                timeArr: null,
                code: null,
                conferenceP: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        methods: {
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
            //取消
            cancel() {
                this.$confirm('确定取消编辑会议内容？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$router.push({path: '/conferenceList'})
                }).catch(() => {
                });
            },

            cheackUser(from) {
                // if (this.meettingId) {
                //     from.meettingId = this.meettingId;
                // }
                // if (this.personnelId) {
                //     from.personnelId = this.personnelId;
                // }
                if (this.timeArr) {
                    from.startTime = this.timeArr[0].getTime();
                    from.endTime = this.timeArr[1].getTime();
                }
                if (this.checkedCities) {
                    this.from.personnelIds = this.checkedCities;
                }
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
                    //遍历得到[人员id数组]
                    if (this.personnels) {
                        for (let i = 0; i < this.personnels.length; i++) {
                            this.personnelsIds[i] = this.personnels[i].id;
                        }
                    }
                })
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
            currenTime() {
                this.currenTime = new Date().toLocaleString();
            }

        },
        mounted() {
            this.queryMeettingRooms({size: this.constant.SIZE_MAX});
            this.queryPersonnels({size: this.constant.SIZE_MAX});
            this.currenTime();
        }
    }

</script>
