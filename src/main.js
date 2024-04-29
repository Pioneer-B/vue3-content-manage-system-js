import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import { useUser } from './store'

// css格式化
// import 'normalize.css'
import './assets/css/index.less'

// antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// antd-icons
import * as icons from '@ant-design/icons-vue'

// utils
import { formatDateTime } from '@/utils/date-format'

const app = createApp(App)
app.use(createPinia())
for (const i in icons) {
    app.component(i, icons[i])
}

// 页面刷新时，重新向store注入数据
useUser().loadStorageData()
// 注册一些全局的属性
app.config.globalProperties.$filters = {
    formatUtcTime(dateTimeString) {
        return formatDateTime(dateTimeString)
    },
}
app.use(router).use(Antd).mount('#app')

// axios测试
// import request, { demo } from './network/index'
// import axios from 'axios'
// demo.get({
//     url: '/get',
//     params: {
//         info: 'test'
//     }
// }).then((res) => {
//     console.log(1, res)
// })
// demo.request({
//     url: '/get',
//     method: 'get',
//     params: {
//         info: 'request-test'
//     },
//     interceptors: {
//         requestInterceptors: (config) => {
//             console.log('3单独请求的config')
//             return config
//         },
//         responseInterceptors: (res) => {
//             console.log('3单独响应的config')
//             return res
//         }
//     }
// })
//     .then((res) => {
//         console.log(2, res)
//     })
//     .catch((err) => {
//         console.log(3, err)
//     })

// axios.get('https://httpbin.org/get', { params: { name: 'why', age: 18 } }).then((res) => {
//     console.log(333, res.data)
// })
// 等同于下面的简写
// axios({ url: 'https://httpbin.org/get', method: 'GET', params: { name: 'why', age: 18 } }).then(
//     (res) => {
//         console.log(333, res.data)
//     }
// )
