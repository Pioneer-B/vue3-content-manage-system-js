<template>
    <div class="goods-cls">
        <page-content ref="pageContentRef" :tableConfig="tableConfig" pageName="goods">
            <template #oldPrice="{ record }">￥{{ record.oldPrice }}</template>
            <template #newPrice="{ record }">￥{{ record.newPrice }}</template>
            <template #imgUrl="{ record }">
                <a-image :width="100" :src="record.imgUrl" />
            </template>
            <template #status="{ key, record }">
                <a-tag :color="record.status ? 'success' : 'volcano'">
                    {{ record.status ? '启用' : '禁用' }}
                </a-tag>
            </template>
        </page-content>
    </div>
</template>
<script setup>
    import tableConfig from './config/content.config'
    import pageContent from '@/components/page-content.vue'
</script>
<style lang="less" scoped>
    /deep/.imgUrlClass {
        display: flex;
        justify-content: center;
    }
</style>
