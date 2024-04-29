<template>
    <a-layout class="main-cls">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="test">
            <div class="logo">
                <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
                <span v-if="!collapsed">运营者平台</span>
            </div>
            <!-- 左侧菜单栏 -->
            <nav-menu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <!-- 导航栏顶部 -->
                <nav-header
                    :isCollapsed="collapsed"
                    @foldChange="(boolean) => (collapsed = boolean)"
                />
            </a-layout-header>
            <a-layout-content
                :style="{
                    padding: '24px 16px',
                    minHeight: '280px',
                    overflow: 'auto',
                }"
            >
                <a-config-provider :locale="locale">
                    <router-view />
                </a-config-provider>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
    import navMenu from '@/components/nav-menu.vue'
    import navHeader from '@/components/nav-header/nav-header.vue'
    import dayjs from 'dayjs'
    import zhCN from 'ant-design-vue/es/locale/zh_CN'
    import 'dayjs/locale/zh-cn'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    dayjs.locale('zh-cn')
    const locale = zhCN
    // const selectedKeys = ref(['1'])
    const collapsed = ref(false)

    // console.log(useRouter().getRoutes())
</script>
<style lang="less" scoped>
    .main-cls {
        height: 100%;
        .logo {
            display: flex;
            // transition: color 0.3s;
            align-items: center;
            justify-content: flex-start;
            height: 32px;
            margin: 16px;
            color: #fff;
            > span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .img {
                height: 100%;
                margin: 0 8px;
            }
        }
    }

    /deep/ .ant-layout-sider-children {
        display: flex;
        overflow: auto;
        flex-direction: column;
    }
</style>
