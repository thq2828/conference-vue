<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>增加人员</p>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="from">
                <el-form-item label="姓名" class="add">
                    <el-input v-model="from.name"></el-input>
                </el-form-item>
                <el-form-item label="部门" class="add">
                    <el-input v-model="from.department"></el-input>
                </el-form-item>
                <el-form-item label="职业" class="add">
                    <el-input v-model="from.profession"></el-input>
                </el-form-item>
                <el-form-item label="性别" class="add">
                    <template>
                        <el-select :clearable=true v-model="from.sex" placeholder="请选择">
                            <el-option v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
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
    import {createPersonnel} from '../../request/api';

    export default {
        name: 'AddPersonnel',
        data() {
            return {
                labelPosition: 'left',
                options: [
                    {
                        value: 1,
                        label: '男'
                    },
                    {
                        value: 2,
                        label: '女'
                    }
                ],
                //会议表单
                from: {
                    name: null,
                    department: null,
                    profession: null,
                    sex: '',
                },
                code: null,
                message: null,
            }
        },
        methods: {
            submitForm(from) {
                createPersonnel(from).then(res => {
                        if (res.code === 1) {
                            this.$confirm('人员保存成功', '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'success'
                            }).then(() => {
                                this.$router.push({path: '/personnelList'})
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
                this.$confirm('确定取消编辑文章内容？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$router.push({path: '/personnelList'})
                }).catch(() => {
                });
            },
        }
    }
</script>