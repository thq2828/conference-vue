import {get, post, put, Delete} from './http'

//获取会议列表
export const getConferences = p => get('/conferences', p);
//获取会议详情接口
export const getConference = p => get('/conference/' + p, null);
//增加会议接口
export const createConference1 = p => post('/conference1', p);
export const createConference = p => post('/conference', p);

//更新会议接口
export const editorConference = p => put('/conference', p);
//删除会议接口
export const deleteConference = p => Delete('/conference/' + p, null);

//根据姓名查找人员
export const getPersonnelByName = p => get('/personnelName', p);
//新增一个人员
export const createPersonnel = p => post('/personnel', p);
//更新一个人员
export const editorPersonnel = p => put('/personnel', p);
//获取人员详情信息
export const getPersonnel = p => get('/personnel/' + p, null);
//删除一个人员
export const deletePersonnel = p => Delete('/personnel/' + p, null);
//获取全部的人员信息
export const getPersonnels = p => get('/personnels', p);
//获取参会人员的信息
export const getPersonnelIds = p => post('/personnelsIds', p);



//获取会议室的信息
export const getMeettingRooms = p => get('/MeettingRooms', p);
//根据姓名获取会议室
export const getMeettingRoomsByName = p => get('/MeettingRoomName', p);
//删除会议室信息
export const deleteMeettingRoom = p => Delete('/MeettingRoom/' + p, null);
//创建会议室
export const createMeettingRoom = p => post('/MeettingRoom', p);
//查询会议室详情
export const getMeettingRoom = p => get('/MeettingRoom/' + p, null);
//更新会议室信息
export const editorMeettingRoom = p => put('/MeettingRoom', p);











