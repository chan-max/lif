import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
// 创建 Axios 实例
export const axiosInstance = axios.create({
    // baseURL: "https://49.232.186.238:4321", // 基础地址
    baseURL: "https://localhost:4321", // 基础地址
    timeout: 50000, // 请求超时时间
    validateStatus: function (status) {
        return status >= 200 && status < 300 || status === 401; // 允许 401
    }
});

import { defaultResponseInterceptors, tokenRequestInterceptor, tokenResponseInterceptor } from "./interception";


axiosInstance.interceptors.response.use(defaultResponseInterceptors)

axiosInstance.interceptors.response.use(tokenResponseInterceptor)
axiosInstance.interceptors.request.use(tokenRequestInterceptor)

// 封装通用请求方法
export const api = {
    get: (url, params = {}, config = {}) =>
        axiosInstance.get(url, { params, ...config }),
    post: (url, data = {}, config = {}) =>
        axiosInstance.post(url, data, { ...config }),
    put: (url, data = {}, config = {}) =>
        axiosInstance.put(url, data, { ...config }),
    delete: (url, config = {}) =>
        axiosInstance.delete(url, { ...config }),
};



export const getBasicConfig = () => new Promise(async (resolve, reject) => {
    try {
        let res = await api.post('/api/config')
        resolve(res.data.data)
    } catch (e) {
        reject()
    }
})



export const login = (params) => new Promise(async (resolve, reject) => {
    try {
        let res = await api.post('/api/auth/login', params)
        resolve(res.data)
    } catch (e) {
        reject()
    }
})

export const logout = () => api.post('/api/user/logout')

export const signup = (params) => api.post('/api/user/signup', params)

export const updateUserInfo = (params) => api.post('/api/user/update', params)

export const getUserInfo = () => new Promise(async (resolve, reject) => {
    let res = await api.post('/api/user/getUserInfo')
    resolve(res.data)
})

// 获取 0 - 100 岁的 人数分布
export const getAgeGenderDistribution = () => new Promise(async (resolve, reject) => {
    let res = await api.get(`/api/analyze/age-gender-distribution`)
    resolve(res.data.data)
})


// 获取身高数据分布
export const getHeightDistribution = () => new Promise(async (resolve, reject) => {
    let res = await api.get(`/api/analyze/height-distribution`)
    resolve(res.data.data)
})


export const createDayrecord = () => new Promise(async (resolve, reject) => {
    let res = await api.post(`/api/dayrecord/create`)
    resolve(res.data.data)
})

export const addRecordDetail = (post: any) => new Promise(async (resolve, reject) => {

    post = {
        createTime: new Date(),
        updateTime: new Date(),
        id: uuidv4(),
        ...post
    }

    let res = await api.post(`/api/dayrecord/add`, post)
    resolve(res.data.data)
})


export const getDayrecord = (id?: any) => new Promise(async (resolve, reject) => {
    let res = await api.get(`/api/dayrecord${id ? '/' + 'id' : ''}`)
    resolve(res.data.data)
})



export const getFoods = (post: any) => new Promise(async (resolve, reject) => {
    let res = await api.post(`/api/food/page`, post)
    resolve(res.data)
})

export default {
    login, logout, getUserInfo, signup, updateUserInfo, getAgeGenderDistribution, getHeightDistribution, createDayrecord, getBasicConfig, getFoods, addRecordDetail, getDayrecord
};
