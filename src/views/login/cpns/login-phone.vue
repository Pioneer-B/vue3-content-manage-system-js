<template>
    <a-form :model="formState" autocomplete="off" ref="formRef">
        <a-form-item
            name="username"
            :rules="[
                { required: true, message: '手机号!' },
                {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '请输入有效的手机号',
                    trigger: 'blur',
                },
            ]"
        >
            <a-input v-model:value="formState.phone" placeholder="手机号">
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '验证码!' }]">
            <div class="getCode">
                <a-input v-model:value="formState.code" placeholder="验证码">
                    <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                </a-input>
                <a-button type="primary" class="code">获取验证码</a-button>
            </div>
        </a-form-item>
    </a-form>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    const formRef = ref()

    const formState = reactive({
        phone: '',
        code: '',
    })
    const onSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log('values', formState)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
    // 主动暴露childMethod方法
    defineExpose({ onSubmit })
</script>
<style lang="less" scope>
    .getCode {
        display: flex;
        .code {
            margin-left: 15px;
        }
    }
</style>
