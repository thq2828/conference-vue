<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <!--按钮区-->
        <div class="button">

            <div class="b-div">
                <p class="b-chart">姓名：</p>
                <el-input class="b-input" v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>

            <div class="b-query b-div">
                <div class="b-b-button" id="reset">
                    <el-button type="warning" plain>重置</el-button>
                </div>
                <div class="b-b-button">
                    <el-button class="b-b-button" type="primary" plain>搜索</el-button>
                </div>
            </div>

        </div>
        <!--标题区-->
        <div class="title">
            <div class="t-title">
                <form class="e-button" action="/addPersonnel">
                    <el-button type="success" native-type="submit">新增</el-button>
                </form>
            </div>
            <div class="t-title"><p>人员列表</p></div>
        </div>
        <!--列表区-->
        <div class="list">
            <table>
                <thead>
                <tr>
                    <td>序号</td>
                    <td>姓名</td>
                    <td>部门</td>
                    <td>职业</td>
                    <td>性别</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>张三</td>
                    <td>移动互联网部</td>
                    <td>软件工程师</td>
                    <td>男</td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>李四</td>
                    <td>移动互联网部</td>
                    <td>软件工程师</td>
                    <td>男</td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>王五</td>
                    <td>移动互联网部</td>
                    <td>软件工程师</td>
                    <td>男</td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>赵六</td>
                    <td>移动互联网部</td>
                    <td>软件工程师</td>
                    <td>男</td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>钱七</td>
                    <td>移动互联网部</td>
                    <td>软件工程师</td>
                    <td>男</td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>6</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>7</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>8</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>9</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                <tr>
                    <td>10</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <input type="button" value="编辑" onclick="location.href='/editorPersonnel'" class="modify">
                        <input type="button" value="删除" class="delete">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--分页区-->
        <div class="page">
            <div class="p-page">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PersonnelList',
        data() {
            return {
                input: '',
                value3: ''
            }

        }
    }
</script>