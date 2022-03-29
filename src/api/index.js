import axios from "axios"
import { URL } from "../config"


    const instance = axios.create({
        baseURL:URL
    })

    const get = async (url)=>{
        return await instance.get(url,{
            withCredentials:true
        })
    }

    const post = async (url,data)=>{
        return await instance.post(url,data,{
            withCredentials:true
        })
    }
    const postFile = (url, data) => {
    return instance.post(url, data, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => { return res })
        .catch(err => { return err.response.data })
    }

    const put = (url, data) => {
    return instance.put(url, data, { withCredentials: true })
        .then(res => { return res })
        .catch(err => { return err.response.data })
    }

    const del = (url) => {
    return instance.delete(url, { withCredentials: true })
        .then(res => { return res })
        .catch(err => { return err.response.data })
    }

    export default instance
    export { get, post, postFile, put, del }