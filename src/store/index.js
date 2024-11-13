import { defineStore } from 'pinia'
import router from '@/router'

import storage from '@/utils/storage'
import {
    accountLoginRequest,
    getPageListData,
    getUserInfoById,
    getUserMenusByRoleId,
} from '@/network/login/login'

import { mapUserMenu } from '@/utils/utils'

export const useUser = defineStore('user', {
    // state是一个函数，返回一个对象
    state: () => {
        return {
            token: '',
            departmentList: [], // 所有的部门list
            roleList: [], // 所有的角色list
            menuList: [], // 所有的菜单list
            userInfo: {}, // 用户信息
            userMenuList: [], // 用户拥有的菜单list（左侧菜单栏, 感觉接口返回有问题，不管配置什么角色，userMenuList都返回全部的菜单）
            // 保存页面的 formData, 便于在pageContent中请求数据时收集 formData参数
            users: {
                formData: {},
            },
            goods: {
                formData: {},
            },
            role: {
                formData: {},
            },
            menu: {
                formData: {},
            },
            department: {
                formData: {},
            },
        }
    },
    getters: {},
    actions: {
        async loginAsync(params) {
            const { data } = await accountLoginRequest(params)
            this.token = data.token
            storage.setStorage('token', data.token)

            await this.getInitialDataAction()
            await this.getUserInfo(data.id)
            await this.getUserMenusList(this.userInfo.role.id)

            //  跳转到首页
            router.push({
                name: 'main',
            })
        },
        // 发送初始化的请求(完整的role/department)
        async getInitialDataAction() {
            // 1.请求部门和角色数据
            const { code, data } = await getPageListData('/department/list', {
                offset: 0,
                size: 1000,
            })
            const { code: code1, data: data1 } = await getPageListData('/role/list', {
                offset: 0,
                size: 1000,
            })
            const { code: code2, data: data2 } = await getPageListData('/menu/list')

            // 2.保存数据
            // if (code === 0) {
            this.departmentList = data.list
            storage.setStorage('departmentList', data.list)
            // }
            // if (code1 === 0) {
            this.roleList = data1.list
            storage.setStorage('roleList', data1.list)
            // }
            console.log(code, data)
            console.log(code1, data1)
            console.log(code2, data2)
            // if (code2 === 0) {
            this.menuList = data2.list
            storage.setStorage('menuList', data2.list)
            // }
        },
        // 请求用户信息
        async getUserInfo(id) {
            const { data } = await getUserInfoById(id)
            this.userInfo = data
            storage.setStorage('userInfo', data)
        },
        // 请求用户的菜单
        async getUserMenusList(roleId) {
            const { data } = await getUserMenusByRoleId(roleId)

            this.userMenuList = data
            storage.setStorage('userMenuList', data)
            // 注入路由
            const routes = mapUserMenu(this.userMenuList)
            routes.forEach((route) => {
                router.addRoute('main', route)
            })
        },
        // 刷新页面时，重新向store注入值
        loadStorageData() {
            const token = storage.getStorage('token')
            if (token) {
                this.token = token
                // this.getInitialDataAction()

                const departmentList = storage.getStorage('departmentList')
                if (departmentList) {
                    this.departmentList = departmentList
                }

                const roleList = storage.getStorage('roleList')
                if (roleList) {
                    this.roleList = roleList
                }

                const menuList = storage.getStorage('menuList')
                if (menuList) {
                    this.menuList = menuList
                }

                const userInfo = storage.getStorage('userInfo')
                if (userInfo) {
                    this.userInfo = userInfo
                }

                const userMenuList = storage.getStorage('userMenuList')
                if (userMenuList) {
                    this.userMenuList = userMenuList
                    const routes = mapUserMenu(userMenuList)
                    routes.forEach((route) => {
                        router.addRoute('main', route)
                    })
                }
            }
        },
    },
})
