<template>
    <a-form :model="formState" autocomplete="off" ref="formRef">
        <a-form-item name="name" :rules="[{ required: true, message: '账号!' }]">
            <a-input v-model:value="formState.name" placeholder="账号">
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '密码!' }]">
            <a-input-password v-model:value="formState.password" placeholder="密码">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input-password>
        </a-form-item>
    </a-form>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import { useUser } from '@/store/index'
    import storage from '@/utils/storage'

    const userStore = useUser()
    const formRef = ref()

    const formState = reactive({
        name: storage.getStorage('name') ?? undefined,
        password: storage.getStorage('password') ?? undefined,
    })
    const onSubmit = (isRemember = true) => {
        formRef.value
            .validate()
            .then(() => {
                // 1.判断是否需要记住密码
                if (isRemember) {
                    storage.setStorage('name', formState.name)
                    storage.setStorage('password', formState.password)
                } else {
                    storage.deleteStorage('name')
                    storage.deleteStorage('password')
                }
                // 2.开始进行登录操作
                userStore.loginAsync(formState)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
    // 主动暴露childMethod方法
    defineExpose({ onSubmit })
</script>
<style lang="less" scope>
    .login-account-cls {
    }
</style>
