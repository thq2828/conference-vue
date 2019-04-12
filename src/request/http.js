import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据

// axios.defaults.baseURL = '/api';//默认请求地址
axios.defaults.timeout = 10000;//设置请求超时
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://10.10.19.202:8081/';


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.parse(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
//put方法
export function put(url, params){
    return new Promise((resolve, reject) =>{
        axios.put(url, QS.parse(params)).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });}

//delete方法
export function Delete(url, params){
    return new Promise((resolve, reject) =>{
        axios.delete(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });}
