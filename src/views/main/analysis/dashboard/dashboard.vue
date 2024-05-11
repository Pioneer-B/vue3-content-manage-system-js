<template>
    <div class="dashboard-cls">
        <a-row :gutter="10">
            <a-col :span="7"> <pie-echart /> </a-col>
            <a-col :span="10"> <mapEchart /> </a-col>
            <a-col :span="7"><roseEchart /> </a-col>
        </a-row>
        <a-row :gutter="10" class="row">
            <a-col :span="12"> <lineEchart /> </a-col>
            <a-col :span="12"> <barEchart /> </a-col>
        </a-row>
    </div>
</template>
<script setup>
    import pieEchart from '@/components/page-charta/src/pie-echart.vue'
    import roseEchart from '@/components/page-charta/src/rose-echart.vue'
    import mapEchart from '@/components/page-charta/src/map-echart.vue'
    import lineEchart from '@/components/page-charta/src/line-echart.vue'
    import barEchart from '@/components/page-charta/src/bar-echart.vue'
</script>

<style lang="less" scope>
    .dashboard-cls {
        .row {
            margin-top: 12px;
        }
    }
</style>
