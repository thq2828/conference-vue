<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>更新人员</p>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="from">
                <el-form-item label="姓名" class="add">
                    <el-input v-model="from.name" :placeholder=personnel.name></el-input>
                </el-form-item>
                <el-form-item label="部门" class="add" >
                    <el-input v-model="from.department" :placeholder=personnel.department></el-input>
                </el-form-item>
                <el-form-item label="职业" class="add" >
                    <el-input v-model="from.profession" :placeholder=personnel.profession></el-input>
                </el-form-item>
                <el-form-item label="性别" class="add">
                    <template>
                        <el-select :clearable=true v-model="from.sex" :placeholder=sex>
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
    import {editorPersonnel, getPersonnel} from '../../request/api';

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
                    id: null,
                    name: null,
                    department: null,
                    profession: null,
                    sex:'',
                },
                sex:null,
                //人员信息
                personnel: null,
                code: null,
                message: null,
            }
        }
        ,
        methods: {
            submitForm(from) {
                this.from.id = this.personnel.id;
                editorPersonnel(from).then(res => {
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
            }
            ,
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
            //获取人员详情
            queryPersonnel(p) {
                getPersonnel(p).then(res => {
                    if (res.code) {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnel = res.data;
                        this.sex=this.personnel.sex===1?'男':'女';
                    }
                })
            }
        },
        mounted() {
            this.queryPersonnel(sessionStorage.getItem("personnelId"))
        }
    }
</script>