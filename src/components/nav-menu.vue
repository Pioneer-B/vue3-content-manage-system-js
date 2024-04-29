<template>
    <!-- <div class="nav-menu-cls"></div> -->
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="onClick"
        :items="items"
    />
</template>
<script setup>
    import { ref, h } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useRoute, useRouter } from 'vue-router'
    import { useUser } from '@/store'
    import { DesktopOutlined } from '@ant-design/icons-vue'
    import { getMenuByPath } from '@/utils/utils'
    const userStore = useUser()
    const router = useRouter()
    const route = useRoute()
    const { menuList } = storeToRefs(userStore)

    const items = ref(mapMenuList(menuList.value))

    // antd
    const { menu, parentMenu } = getMenuByPath(items.value, route.path)
    const selectedKeys = ref([menu.key])
    const openKeys = ref([parentMenu.key])

    function mapMenuList(list) {
        return list.map((item) => {
            const obj = {
                // id: item.id,
                url: item.url,
                type: item.type,
                // 新增属性
                key: item.url,
                label: item.name,
                title: item.name,
                children:
                    item.children && item.children.length && item.type !== 2
                        ? mapMenuList(item.children)
                        : undefined,
            }
            if (item.type === 1) obj.icon = () => h(DesktopOutlined)
            return obj
        })
    }

    const onClick = ({ key }) => {
        router.push({ path: key ?? '/not-found' })
    }
</script>
<style lang="less" scope>
    .nav-menu-cls {
    }
</style>
