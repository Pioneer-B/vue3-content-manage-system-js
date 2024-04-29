<template>
    <div class="user-cls">
        <page-search
            :formConfig="formConfig"
            pageName="users"
            @search="onSearch"
            @reset="onReset"
        ></page-search>
        <page-content
            ref="pageContentRef"
            :tableConfig="tableConfig"
            pageName="users"
            @add="onAdd"
            @update="onUpdate"
        >
            <template #enable="{ key, record }">
                <a-tag :color="record.enable ? 'success' : 'volcano'">
                    {{ record.enable ? '启用' : '禁用' }}
                </a-tag>
            </template>
        </page-content>
        <page-model
            ref="pageModalRef"
            pageName="users"
            :modalConfig="modalConfigRef"
            :defaultInfo="defaultInfo"
            @ok="onOk(pageContentRef)"
        ></page-model>
    </div>
</template>
<script setup>
    import formConfig from './config/search.config'
    import pageSearch from '@/components/page-search.vue'
    import tableConfig from './config/content.config'
    import pageContent from '@/components/page-content.vue'
    import modalConfig from './config/modal.config.js'
    import pageModel from '@/components/page-model.vue'

    import { computed, onMounted, ref } from 'vue'
    import { getUserList } from '@/network/user/user'

    import { usePageSearch } from '@/hooks/usePageSearch'
    import { usePageModal } from '@/hooks/usePageModal'

    // 搜索 hook
    const { pageContentRef, onSearch, onReset } = usePageSearch()

    // 处理新增和编辑时，需要的部门和角色的数据
    // 如果想每次打开新建和 编辑弹窗，都请求部门和角色数据，在addCallBack 和 updateCallBack里调用initData即可
    onMounted(() => initData())
    const entireDepartmentList = ref([])
    const entireRoleList = ref([])
    async function initData() {
        const { data: departmentData } = await getUserList('/department/list', {
            offset: 0,
            size: 1000,
        })
        const { list: list1, totalCount: count1 } = departmentData
        entireDepartmentList.value = list1

        // 动态传入 部门和角色 方法2(如果吧数据请求写在本页面的，方法2更为简单)
        // 在请求到数据后，直接修改modalConfig属性的值，因为options是复杂数据类型，引用地址是一样的
        // const departmentItem = modalConfig.formItems.find((item) => item.filed === 'departmentId')
        // departmentItem.options = list1.map((item) => {
        //     return {
        //         value: item.id,
        //         label: item.name,
        //     }
        // })

        const { data: RoleData } = await getUserList('/role/list', {
            offset: 0,
            size: 1000,
        })
        const { list: list2, totalCount: count2 } = RoleData
        entireRoleList.value = list2
    }
    // 动态传入 部门和角色 方法1，
    // 假设场景：假如在main.js里调用请求数据的接口，数据保存在store，
    // 关键：在等到有数据后，再往modalConfig里注入值，关键在于 怎么知道已经有数据了
    // 做法：把对部门 和角色处理的逻辑，放在computed里，因为存放部门和角色的数组，都是在store中定义过的，
    // 只要数组发生变化，整个computed会重新计算，
    const modalConfigRef = computed(() => {
        const departmentItem = modalConfig.formItems.find((item) => item.filed === 'departmentId')
        departmentItem.options = entireDepartmentList.value.map((item) => {
            return {
                value: item.id,
                label: item.name,
            }
        })

        const roleItem = modalConfig.formItems.find((item) => item.filed === 'roleId')
        roleItem.options = entireRoleList.value.map((item) => {
            return {
                value: item.id,
                label: item.name,
            }
        })
        return modalConfig
    })

    // 弹窗 hook
    function addCallBack() {
        modalConfig.formItems.find((item) => item.filed === 'password').isHidden = false
        modalConfig.title = '新建用户'
    }
    function updateCallBack() {
        modalConfig.formItems.find((item) => item.filed === 'password').isHidden = true
        modalConfig.title = '编辑用户'
    }
    const { pageModalRef, defaultInfo, onAdd, onUpdate, onOk } = usePageModal(
        addCallBack,
        updateCallBack
    )
</script>
<style lang="less" scope>
    .user-cls {
    }
</style>
