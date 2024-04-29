import Request from './request/index'
import storage from '@/utils/storage'

// 根据process.env.NODE_ENV区分
// webpack的DefinePlugin会根据不同的环境，自动给process.env.NODE_ENV变量注入不同的值
// 例如开发环境下process.env.NODE_ENV的值为: development。生成环境下为: production、测试环境下为: test
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://123.207.32.32:5000/'
    // BASE_URL = 'http://httpbin.org'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://coderwhy.org/prod'
} else {
    BASE_URL = 'http://coderwhy.org/test'
}

export default new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT, // 同一个实例的所有请求的拦截
    interceptors: {
        requestInterceptors: (config) => {
            // 携带token的拦截
            const token = storage.getStorage('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            // console.log(`1同一个实例的请求成功`)
            return config
        },
        requestInterceptorsCatch: (err) => {
            // console.log(`1同一个实例的请求失败`)
            return err
        },
        responseInterceptors: (config) => {
            // console.log(`1同一个实例的响应成功`)
            return config
        },
        responseInterceptorsCatch: (err) => {
            // console.log(`1同一个实例的响应失败`)
            return err
        },
    },
})

export const mockRequest = new Request({
    baseURL: 'https://httpbin.org',
    timeout: 5000,
    interceptors: {
        requestInterceptors: (config) => {
            // 携带token的拦截
            const token = storage.getStorage('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            // console.log(`1同一个实例的请求成功`)
            return config
        },
        requestInterceptorsCatch: (err) => {
            // console.log(`1同一个实例的请求失败`)
            return err
        },
        responseInterceptors: (res) => {
            // console.log(`1同一个实例的响应成功`)
            const { method } = res.config
            if (method === 'get') {
                res.data.data = res.data.args
            } else if (method === 'post') {
                res.data.data = JSON.parse(res.data.data)
            }

            return res
        },
        responseInterceptorsCatch: (err) => {
            // console.log(`1同一个实例的响应失败`)
            return err
        },
    },
})
