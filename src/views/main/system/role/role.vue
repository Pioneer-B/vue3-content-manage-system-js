<template>
    <div class="role-cls">
        <page-search
            :formConfig="formConfig"
            pageName="role"
            @search="onSearch"
            @reset="onReset"
        ></page-search>
        <page-content
            ref="pageContentRef"
            :tableConfig="tableConfig"
            pageName="role"
            @add="onAdd"
            @update="onUpdate"
        ></page-content>
        <page-model
            ref="pageModalRef"
            pageName="role"
            :modalConfig="modalConfig"
            :defaultInfo="defaultInfo"
            :otherInfo="otherInfo"
        >
            <a-tree
                v-model:checkedKeys="checkedKeys"
                checkable
                :tree-data="treeData"
                @check="onCheck"
            >
                <template #title="{ title, key }">
                    <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
                    <template v-else>{{ title }}</template>
                </template>
            </a-tree>
        </page-model>
    </div>
</template>
<script setup>
    import { provide, ref, watch } from 'vue'
    import { useUser } from '@/store'
    import { storeToRefs } from 'pinia'

    import { recurseMenuGetleafKeys } from '@/utils/utils'

    import formConfig from './config/search.config'
    import tableConfig from './config/content.config'
    import pageSearch from '@/components/page-search.vue'
    import pageContent from '@/components/page-content.vue'
    import modalConfig from './config/modal.config.js'
    import pageModel from '@/components/page-model.vue'

    import { usePageSearch } from '@/hooks/usePageSearch'
    import { usePageModal } from '@/hooks/usePageModal'

    const userStore = useUser()
    const { menuList } = storeToRefs(userStore)

    // 搜索 hook
    const { pageContentRef, onSearch, onReset } = usePageSearch()

    // provide('resetDataFn', onReset)
    // provide('searchDataFn', onSearch)

    // modal hook
    function addCallBack() {
        modalConfig.title = '新建角色'
        checkedKeys.value = []
        otherInfo.value = []
    }
    function updateCallBack(item) {
        console.log(item)
        modalConfig.title = '编辑角色'
        const [leafKeys, parentKeys] = recurseMenuGetleafKeys(item.menuList)
        otherInfo.value = { menuList: [...leafKeys, ...parentKeys] }
        checkedKeys.value = leafKeys
    }
    const { pageModalRef, defaultInfo, onAdd, onUpdate } = usePageModal(addCallBack, updateCallBack)

    const treeData = mapMenulistToTreedata(menuList.value)
    const checkedKeys = ref([])
    const otherInfo = ref({})
    function onCheck(checkedKeys, { halfCheckedKeys }) {
        console.log(checkedKeys, { halfCheckedKeys })
        otherInfo.value = { menuList: [...checkedKeys, ...halfCheckedKeys] }
    }
    function mapMenulistToTreedata(menuList) {
        return menuList.map((item) => {
            const obj = {
                id: item.id,
                type: item.type,
                parentId: item.parentId,
                children:
                    item.children && item.children.length && mapMenulistToTreedata(item.children),
                // add key
                title: item.name,
                key: item.id,
                selectable: false,
            }
            return obj
        })
    }
</script>
<style lang="less" scope>
    .role-cls {
    }
</style>
