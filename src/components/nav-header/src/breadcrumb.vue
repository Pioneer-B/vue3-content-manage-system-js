<template>
    <a-breadcrumb>
        <template v-for="item in breadcrumbsList" :key="item.url">
            <a-breadcrumb-item>{{ item.name }}</a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>
<script setup>
    import { useUser } from '@/store'
    import { getBreadcrumbsByPath } from '@/utils/utils'
    import { storeToRefs } from 'pinia'
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    const userStore = useUser()

    const breadcrumbsList = computed(() => {
        const route = useRoute()
        const { menuList } = storeToRefs(userStore)
        return getBreadcrumbsByPath(menuList.value, route.path)
    })
</script>
