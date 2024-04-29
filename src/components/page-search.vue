<template>
    <my-form v-bind="formConfig" v-model="formData" :pageName="pageName">
        <template #footer>
            <a-button @click="handleReset"><SyncOutlined />重置</a-button>
            <a-button type="primary" @click="handleSearch"><SearchOutlined />搜索</a-button>
        </template>
    </my-form>
</template>
<script setup>
    import myForm from '@/base-ui/my-form/my-form.vue'
    import { ref } from 'vue'
    import { useUser } from '@/store'
    const userStore = useUser()

    const props = defineProps({
        formConfig: {
            type: Object,
            required: true,
        },
        pageName: {
            type: String,
            required: true,
        },
    })
    const emit = defineEmits(['reset', 'search'])

    // 双向绑定的formData属性应该是由配置文件的filed属性来动态决定
    const formItems = props.formConfig?.formItems ?? []
    // Tips: 目标对象formOrignData 和 代理对象formData，他们不是同一个内存地址，两者毫无关系
    const formOrignData = {}
    formItems.forEach((item) => (formOrignData[item.filed] = undefined))
    const formData = ref(formOrignData)
    userStore[props.pageName].formData = formData.value

    function handleReset() {
        // formData.value= formOrignData  不能直接更改整个对象，只能遍历formData对象中的每个属性，单独去更改每个属性的值
        // 方法1：对每个属性重新赋值
        formItems.forEach((item) => (formData.value[item.filed] = undefined))
        // 方法2（简单）：直接调用form的resetFields()

        emit('reset')
    }
    function handleSearch() {
        emit('search', formData.value)
    }

    defineExpose({ formData })
</script>
<style lang="less" scope>
    .page-search-cls {
    }
</style>
