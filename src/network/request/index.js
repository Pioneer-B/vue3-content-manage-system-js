import axios from 'axios'

export default class Request {
    constructor(config) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors

        // 从config中取出对应实例的拦截器,这个拦截器不是每个实例都有，因为他是可选的，你传入了拦截器这个实例才会有
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptors,
            this.interceptors?.requestInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptors,
            this.interceptors?.responseInterceptorsCatch
        )

        // 添加所有实例都有的拦截器，目的：如进行Loading操作
        this.instance.interceptors.request.use(
            (config) => {
                // console.log(`2所有的实例拦截器请求 成功`)
                return config
            },
            (err) => {
                console.log(`2所有的实例拦截器请求 失败`)
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                // console.log(`2所有的实例拦截器响应 成功`)
                if (res && res.data && res.data.returnCode === '-1001') {
                    console.log(`请求失败`)
                } else {
                    return res.data
                }
            },
            (err) => {
                console.log(`2所有的实例拦截器响应 失败`)
                // 判断不同的HttpErrorCode显示不同的错误信息
                if (err.response.status === 404) {
                    console.log(`404的错误`)
                }
                return err
            }
        )
    }
    request(config) {
        // return this.instance.request(config) 不想封装响应拦截的话，这样写也可以，
        return new Promise((resolve, reject) => {
            /**
             * 单个请求的拦截处理:
             * requestInterceptors()函数接收config对象参数，返回值也是config对象
             * config = config.interceptors.requestInterceptors(config)的作用：
             *  - 执行requestInterceptors()，可以在该函数里做一些拦截操作，然后将config在返回出去
             */
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config)
            }
            this.instance
                .request(config)
                .then((res) => {
                    // 单个 的处理
                    if (config.interceptors?.responseInterceptors) {
                        res = config.interceptors.responseInterceptors(res)
                    }
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    get(config) {
        return this.request({ ...config, method: 'GET' })
    }
    post(config) {
        return this.request({ ...config, method: 'POST' })
    }
    delete(config) {
        return this.request({ ...config, method: 'DELETE' })
    }
    patch(config) {
        return this.request({ ...config, method: 'PATCH' })
    }
}
