<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>更新会议室</p>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="from">
                <el-form-item label="姓名" class="add">
                    <el-input v-model="from.name" :placeholder=meettingRoom.name></el-input>
                </el-form-item>
                <el-form-item label="部门" class="add">
                    <el-input v-model="from.address" :placeholder=meettingRoom.address></el-input>
                </el-form-item>
                <el-row>
                    <el-col :xs="24" :sm="24" style="text-align: center;margin-top: 30px">
                        <el-button
                                size="medium" type="danger" @click="cancel()">取消
                        </el-button>
                        <el-button size="medium" type="success" @click="submitForm(from)">保存
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {getMeettingRoom, editorMeettingRoom} from '../../request/api';

    export default {
        name: 'AddMeetting',
        data() {
            return {
                labelPosition: 'left',
                //会议表单
                from: {
                    name: null,
                    address: null,

                },
                code: null,
                message: null,
                meettingRoom: null,
            }
        },
        methods: {
            submitForm(from) {
                this.from.id = this.meettingRoom.id;
                editorMeettingRoom(from).then(res => {
                        if (res.code === 1) {
                            this.$confirm('人员保存成功', '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'success'
                            }).then(() => {
                                this.$router.push({path: '/meettingList'})
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
            }
            ,
            //取消
            cancel() {
                this.$confirm('确定取消编辑文章内容？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$router.push({path: '/meettingList'})
                }).catch(() => {
                });
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
            this.queryMeettingRoom(sessionStorage.getItem("meettingRoomId"))
        }
    }
</script>