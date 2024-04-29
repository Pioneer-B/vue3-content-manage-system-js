<template>
    <a-dropdown>
        <span>
            <a-avatar style="margin-right: 5px">
                <template #icon><UserOutlined /></template>
            </a-avatar>
            {{ userInfo.name }}
            <DownOutlined />
        </span>
        <template #overlay>
            <a-menu>
                <a-menu-item key="0"> 用户信息 </a-menu-item>
                <a-menu-item key="1"> 系统管理 </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3" @click="exitClick">退出登录</a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script setup>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUser } from '@/store'
    import { storeToRefs } from 'pinia'
    import storage from '@/utils/storage'
    const userStore = useUser()
    const router = useRouter()

    const { userInfo } = storeToRefs(userStore)
    function exitClick() {
        storage.deleteStorage('token')
        router.push('/login')
    }
</script>
