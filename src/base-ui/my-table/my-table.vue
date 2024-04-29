<template>
    <div class="my-table-cls">
        <div class="header">
            <slot name="header">
                <div class="title">{{ title }}</div>
                <div class="handler">
                    <slot name="headerHandler"></slot>
                </div>
            </slot>
        </div>
        <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            v-bind="otherProps"
            bordered
        >
            <template #bodyCell="{ column, record, index }">
                <template v-if="true">
                    <slot :name="column.dataIndex" :record="record" :index="index">
                        {{ record[`${column.dataIndex}`] }}
                    </slot>
                </template>
            </template>
        </a-table>
        <div class="footer" v-if="showFooter">
            <slot name="footer">
                <a-pagination
                    v-model:current="pagination.current"
                    v-model:pageSize="pagination.pageSize"
                    size="small"
                    :total="total"
                    :show-total="(total) => `总共 ${total} 条`"
                    :page-size-options="['10', '20', '50']"
                    @change="onChange"
                />
            </slot>
        </div>
    </div>
</template>
<script setup>
    import { useUser } from '@/store'
    const userStore = useUser()

    const props = defineProps({
        pageName: {
            type: String,
            required: true,
        },
        dataSource: {
            type: Array,
            reqiured: true,
        },
        columns: {
            type: Array,
            reqiured: true,
        },
        title: {
            type: String,
            default: '',
        },
        // 这里使用pagination直接绑定current pageSize是违背单向数据流，只是编译器没提示，就算是监听current pageSize的改变，然后emit
        // 也是违背单向数据流思想，因为antd底层会自动去修改current pageSize，子组件emit和不emit都是一样的效果，
        // 正确思路：先拷贝，在watch，和form表单的做法一样
        pagination: {
            type: Object,
            default: () => ({ current: 1, pageSize: 10 }),
        },
        total: {
            type: Number,
            reqiured: true,
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
        otherProps: {
            type: Object,
            default: () => {},
        },
    })

    // const pageSize = ref(20)
    // const current1 = ref(3)
    // const pagination = ref({
    //     size: 'small',
    //     pageSize: 20,
    //     current: 3,
    //     total: 500,
    //     shouTotal: (total) => `Total ${total} items`,
    // })
    // const onShowSizeChange = (current, pageSize) => {
    //     console.log(current, pageSize)
    // }
    const onChange = (page, pageSize) => {
        // 将formData在store中保存一份，用于后续 请求表格数据时收集 pagination 和 fromData ，
        // userStore[props.pageName].pagination.current = page
        // userStore[props.pageName].pagination.pageSize = pageSize
    }
    // watch(pageSize, () => {
    //     console.log('pageSize', pageSize.value)
    // })
    // watch(current1, () => {
    //     console.log('current', current1.value)
    // })
</script>
<style lang="less" scoped>
    .my-table-cls {
        padding: 0 24px 24px;
        background-color: #fff;
    }
    .header {
        display: flex;
        height: 45px;
        padding: 0 5px;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 20px;
            font-weight: 700;
        }

        .handler {
            align-items: center;
        }
    }
    .footer {
        margin: 16px 0;
        text-align: right;
    }
</style>
