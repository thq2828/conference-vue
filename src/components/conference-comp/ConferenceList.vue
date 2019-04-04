<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <!--按钮区-->
        <div class="button">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </div>
        <!--标题区-->
        <div class="title">
            <p id="add1"><input type="button" class="add" value="新增"/></p>
            <p>会议列表</p>
        </div>
        <!--列表区-->
        <div class="list">
            <table>
                <thead>
                <tr>
                    <td>序号</td>
                    <td>会议标题</td>
                    <td>会议室</td>
                    <td>地点</td>
                    <td>组织人员</td>
                    <td>时间</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>后端评审1</td>
                    <td>会议室1</td>
                    <td>康拓普2楼211</td>
                    <td>张三</td>
                    <td>2019.03.25 09:00-11:00</td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>后端评审2</td>
                    <td>会议室2</td>
                    <td>康拓普2楼212</td>
                    <td>张三</td>
                    <td>2019.03.26 09:00-11:00</td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>后端评审3</td>
                    <td>会议室3</td>
                    <td>康拓普2楼213</td>
                    <td>张三</td>
                    <td>2019.03.27 09:00-11:00</td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>后端评审4</td>
                    <td>会议室4</td>
                    <td>康拓普2楼214</td>
                    <td>张三</td>
                    <td>2019.03.28 09:00-11:00</td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>后端评审5</td>
                    <td>会议室5</td>
                    <td>康拓普2楼215</td>
                    <td>张三</td>
                    <td>2019.03.29 09:00-11:00</td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>6</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>7</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>8</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>9</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>10</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
        <!--分页区-->
        <div class="page">
            <ul class="pagination pagination-lg">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ConferenceList'
    }
</script>
