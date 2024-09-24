import axios from "axios";
const baseUrl = ''
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    /**
     * 返回axios的内部配置
     * @returns axios的内部配置
     */
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    /**
     * 为axios实例添加拦截器
     * @param {axios} instance axios实例
     */
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            const {code,data} = response.data
            if(code == 200){
                return data
            } else {
                //
            }

            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    request(options){
        const instance = axios.create() //创建axios实例
        options = {...this.getInsideConfig(),...options} //合并配置 this.getInsideConfig()：内部配置，options：其他配置
        this.interceptors(instance) //为请求实例添加拦截器
        return instance(options) //返回配置好的axios实例
    }
}

export default new HttpRequest(baseUrl)