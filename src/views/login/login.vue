<template>
    <div class="login-cls">
        <div class="login">
            <a-tabs v-model="activeKey" type="card" class="login-panel">
                <a-tab-pane key="1" class="test">
                    <template #tab>
                        <UserOutlined />
                        账号登陆
                    </template>
                    <login-account ref="accountRef" />
                </a-tab-pane>
                <a-tab-pane key="2">
                    <template #tab>
                        <android-outlined />
                        手机登录
                    </template>
                    <login-phone />
                </a-tab-pane>
            </a-tabs>

            <div class="other">
                <a-checkbox v-model:checked="formState.remember" style="color: #1677ff">记住密码</a-checkbox>
                <a-button type="link">忘记密码</a-button>
            </div>
            <a-button type="primary" class="login-btn" @click="onLogin">登录</a-button>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive } from 'vue'
    import loginAccount from './cpns/login-account'
    import loginPhone from './cpns/login-phone.vue'

    const accountRef = ref(null)
    const activeKey = ref('1')

    const formState = reactive({
        remember: true,
    })
    function onLogin() {
        if (activeKey.value === '1') {
            accountRef.value.onSubmit(formState.remember)
        }
    }
    // defineProps({

    // })
</script>
<style lang="less" scoped>
    .login-cls {
        height: 100%;
        background-image: url('@/assets/img/login-bg.svg');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .login {
            background-color: #fff;
            margin-bottom: 150px;
            .other {
                display: flex;
                justify-content: space-between;
                align-items: center;
                a {
                    font-size: 14px;
                }
            }
            .login-btn {
                width: 100%;
            }
        }
    }

    /deep/.login-panel {
        width: 320px;

        // border: 1px solid #ccc;
        .ant-tabs-nav-list {
            width: 100%;
            .ant-tabs-tab {
                flex: 1;
                text-align: center;
                .ant-tabs-tab-btn {
                    width: 100%;
                }
            }
        }
    }
</style>
