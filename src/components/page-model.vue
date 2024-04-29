<template>
    <a-modal
        v-model:open="open"
        :title="modalConfig.title"
        width="30%"
        destroyOnClose
        :confirm-loading="confirmLoading"
        wrapClassName="page-modal-class"
        @ok="handleOk"
    >
        <my-form v-bind="modalConfig" v-model="formData"></my-form>
        <slot></slot>
    </a-modal>
</template>
<script setup>
    import myForm from '@/base-ui/my-form/my-form.vue'

    import { ref, watch } from 'vue'
    import { addUser, updateUser } from '@/network/user/user'
    import { message } from 'ant-design-vue'

    const emit = defineEmits(['ok'])
    const props = defineProps({
        modalConfig: {
            type: Object,
            required: true,
        },
        defaultInfo: {
            // 新建时为空，编辑时为点击的这条数据
            type: Object,
            default: () => {},
        },
        pageName: {
            type: String,
            require: true,
        },
        otherInfo: {
            // 一些复杂数据，不能在modalConfig中配置，比如树状图。这种情况可以使用模板中的默认插槽
            // 使用othetInfo将交互数据传进来，用于新建和编辑时的接口参数
            type: Object,
            default: () => ({}),
        },
    })

    // 表单默认值是根据modalConfig的配置数据来决定的
    const formData = ref({})
    watch(
        () => props.defaultInfo,
        (newValue) => {
            const formItems = props.modalConfig.formItems
            formItems.forEach((item) => {
                formData.value[`${item.filed}`] = newValue[`${item.filed}`]
            })
        }
    )

    const open = ref(false)
    const confirmLoading = ref(false)
    const showModal = () => {
        open.value = true
    }

    const urlMap = {
        users: '/users',
        role: '/role',
        department: '/department',
    }
    const handleOk = () => {
        confirmLoading.value = true
        if (Object.keys(props.defaultInfo).length) {
            // 编辑
            updateUser(urlMap[props.pageName], props.defaultInfo.id, {
                ...formData.value,
                ...props.otherInfo,
            })
                .then(({ code, data }) => {
                    if (code === 0) {
                        message.success(data)
                        emit('ok')
                    } else {
                        message.error(data)
                    }
                })
                .catch((err) => {
                    message.warn('网络错误，请联系管理员')
                    console.log(err, '报错了')
                })
                .finally(() => {
                    confirmLoading.value = false
                    open.value = false
                })
        } else {
            // 新建
            addUser(urlMap[props.pageName], { ...formData.value, ...props.otherInfo })
                .then(({ code, data }) => {
                    if (code === 0) {
                        emit('ok')
                        message.success(data)
                    } else {
                        message.error(data)
                    }
                })
                .catch((err) => {
                    message.warn('网络错误，请联系管理员')
                    console.log(err, '报错了')
                })
                .finally(() => {
                    confirmLoading.value = false
                    open.value = false
                })
        }
    }

    defineExpose({ showModal })
</script>
<!-- <style lang="less" scoped>
    .page-model-cls {
    }
</style> -->
<style>
    .page-modal-class .ant-form {
        margin-bottom: 0 !important;
    }
</style>
