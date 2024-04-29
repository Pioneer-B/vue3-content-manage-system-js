<template>
    <!-- <div class='page-content-cls'></div> -->
    <my-table
        :dataSource="dataSource"
        v-bind="tableConfig"
        v-model:pagination="pagination"
        :total="total"
        :pageName="pageName"
    >
        <!-- 头部插槽 -->
        <template #headerHandler>
            <a-button v-if="isCreate" type="primary" @click="handleAdd">新建用户</a-button>
        </template>

        <!-- 单元格插槽 -->
        <template #no="{ index }"> {{ index + 1 }} </template>
        <template #createAt="{ index, record }">
            {{ $filters.formatUtcTime(record.createAt) }}
        </template>
        <template #updateAt="{ index, record }">
            {{ $filters.formatUtcTime(record.updateAt) }}
        </template>
        <template #handle="{ record }">
            <a v-if="isUpdate" @click="handleEdit(record)"> 编辑 </a>
            <a v-if="isDelete" @click="handleDelete(record.id)"> 删除 </a>
        </template>

        <!-- 在page-content中动态插入剩余的插槽 -->
        <template
            v-for="item in otherSlots"
            :key="item.dataIndex"
            #[item.dataIndex]="{ key, record }"
        >
            <slot :name="item.dataIndex" :record="record"></slot>
        </template>
    </my-table>
</template>
<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { useUser } from '@/store'
    import { message } from 'ant-design-vue'
    import { getUserList, deleteUser } from '@/network/user/user'
    import { usePermission } from '@/hooks/usePermissions.js'
    import myTable from '@/base-ui/my-table/my-table.vue'
    const userStore = useUser()

    const props = defineProps({
        tableConfig: {
            type: Object,
            required: true,
        },
        pageName: {
            type: String,
            required: true,
        },
    })
    const emit = defineEmits(['add', 'update'])
    onMounted(() => initData())

    // 获取当前用户的操作权限
    const isCreate = usePermission('menu', 'create')
    const isUpdate = usePermission('menu', 'update')
    const isDelete = usePermission('menu', 'delete')
    // 一般来讲，如果没有查询权限，那么这个页面都不应该看到这个模块，个人觉得isQuery是多余的
    const isQuery = usePermission('menu', 'query')

    // 表格分页器
    const pagination = ref({
        current: 1,
        pageSize: 10,
    })
    const total = ref(0)

    // 请求表格数据
    const dataSource = ref([])
    const pageUrlMap = {
        users: '/users/list',
        role: '/role/list',
        menu: '/menu/list',
        goods: '/goods/list',
        department: '/department/list',
    }
    const url = pageUrlMap[props.pageName]
    async function initData() {
        try {
            const { data } = await getUserList(url, {
                offset: (pagination.value.current - 1) * pagination.value.pageSize,
                size: pagination.value.pageSize,
                ...userStore[props.pageName].formData,
            })
            dataSource.value = data.list.map((item) => ({ ...item, key: item.id }))
            total.value = data.totalCount ?? 0
        } catch (error) {
            console.log('请求表格数据出错', error)
        }
    }

    watch(() => pagination.value.current, initData, { deep: true })
    watch(() => pagination.value.pageSize, handleSearch)

    // CRUD 操作
    function handleSearch() {
        pagination.value.current === 1 ? initData() : (pagination.value.current = 1)
    }
    function handleAdd() {
        emit('add')
    }
    function handleEdit(record) {
        emit('update', record)
    }
    async function handleDelete(id) {
        await deleteUser(`${props.pageName}/${id}`)
        message.success('删除成功')
        handleSearch()
    }

    // 一些比较公共的列（如序号）。可以直接在pageContent中配置
    // 一些页面独有的列，设计成跨组件动态插槽，
    const fixedSlotsList = ['no', 'handle', 'createAt', 'updateAt'] // fixedSlotsList：固定的列，不需要做成跨组件插槽
    const otherSlots = props.tableConfig.columns.filter((column) => {
        const boolean = fixedSlotsList.includes(column.dataIndex)
        return !boolean
    })

    defineExpose({ initData, handleSearch })
</script>
<style lang="less">
    .page-content-cls {
    }
</style>
