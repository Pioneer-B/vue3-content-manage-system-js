<template>
    <div class="menu-cls">
        <page-content ref="pageContentRef" :tableConfig="tableConfig" pageName="menu">
        </page-content>
    </div>
</template>
<script setup>
    import tableConfig from './config/content.config'
    import pageContent from '@/components/page-content.vue'
</script>
<style lang="less" scoped>
    .menu-cls {
    }
</style>
