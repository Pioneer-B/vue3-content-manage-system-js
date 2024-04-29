<template>
    <div class="department-cls">
        <page-search
            :formConfig="formConfig"
            pageName="department"
            @search="onSearch"
            @reset="onReset"
        ></page-search>
        <page-content
            ref="pageContentRef"
            :tableConfig="tableConfig"
            pageName="department"
            @add="onAdd"
            @update="onUpdate"
        >
            <template #parentId="{ key, record }"> {{ department[record.parentId] }} </template>
        </page-content>
        <page-model
            ref="pageModalRef"
            pageName="department"
            :modalConfig="modalConfig"
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

    import { usePageSearch } from '@/hooks/usePageSearch'
    import { usePageModal } from '@/hooks/usePageModal'

    import { getUserList } from '@/network/user/user'
    import { computed, onMounted, ref } from 'vue'

    // 搜索 hook
    const { pageContentRef, onSearch, onReset } = usePageSearch()

    // 弹窗 hook
    function addCallBack() {
        modalConfig.title = '新建部门'
        getDepartmentList(department.value)
    }
    function updateCallBack() {
        modalConfig.title = '编辑部门'
        getDepartmentList(department.value)
    }
    const { pageModalRef, defaultInfo, onAdd, onUpdate, onOk } = usePageModal(
        addCallBack,
        updateCallBack
    )
    async function getDepartmentList(obj) {
        const { data } = await getUserList('/department/list', {
            offset: 0,
            size: 1000,
        })
        if (obj) Object.assign(obj, mapDeparmentToObj(data.list))
        const departmentItem = modalConfig.formItems.find((item) => item.filed === 'parentId')
        departmentItem.options = data.list.map((item) => {
            return {
                value: item.id,
                label: item.name,
            }
        })
    }

    // 将 上级部门 显示为 部门名称，而不是显示部门id
    const department = ref({})
    onMounted(() => getDepartmentList(department.value))
    function mapDeparmentToObj(list) {
        const obj = {}
        list.forEach((item) => (obj[item.id] = item.name))
        return obj
    }
</script>
<style lang="less" scope>
    .department-cls {
    }
</style>
