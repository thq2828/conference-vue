<template>
    <!--内容-->
    <!--内容-->
    <div class="content">
        <div class="title">
            <p>会议详情</p>
        </div>

        <div class="list">
            <table>
                <thead>
                <tr>
                    <td>分类</td>
                    <td>详情</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>标题</td>
                    <td>{{conference.title}}</td>
                </tr>
                <tr>
                    <td>会议室名字</td>
                    <td>{{meettingRoom.name}}</td>
                </tr>
                <tr>
                    <td>地点</td>
                    <td>{{meettingRoom.address}}</td>
                </tr>
                <tr>
                    <td>组织人员</td>
                    <td>{{personnel.name}}</td>
                </tr>
                <tr>
                    <td>参会人员</td>
                    <td><span v-for="personnel1 in personnels">{{personnel1.name}};</span></td>
                </tr>
                <tr>
                    <td>时间</td>
                    <td>{{new Date(conference.startTime).toLocaleString()}} - {{new
                        Date(conference.endTime).toLocaleString()}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import {getConference, getMeettingRoom, getPersonnel, getPersonnelIds} from '../../request/api';

    export default {
        name: 'ConferenceDetail',
        data() {
            return {
                //会议详情
                conference: '',
                //会议室
                meettingRoom: '',
                //组织人员
                personnel: '',
                //参会人员
                personnels: '',
                //参会人员名字数组
                ids:[],
            }
        }, methods: {
            queryConference(p) {
                getConference(p).then(res => {
                    if (res.code === 1) {
                        this.code = res.code;
                        this.message = res.message;
                        this.conference = res.data;
                        console.log(this.conference.personnelIds);
                        this.ids=this.conference.personnelIds;
                        this.queryPersonnelIds(this.ids);
                    } else {
                        this.code = res.code;
                        this.message = res.message;
                        this.conference = res.data;
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
            //获取参会人员信息
            queryPersonnelIds(p) {
                getPersonnelIds({ids:p}).then(res => {
                    if (res.code) {
                        this.code = res.code;
                        this.message = res.message;
                        this.personnels = res.data;
                    }
                })
            }
        }
        , created() {
            this.queryConference(sessionStorage.getItem("conferenceId"));
            this.queryMeettingRoom(sessionStorage.getItem("meettingRoomId"));
            this.queryPersonnel(sessionStorage.getItem("personnelId"));
        }
    }

</script>
