<template>
    <div class="rose-echart-cls">
        <card title="分类商品数量(玫瑰图)">
            <base-echart :options="options" />
        </card>
    </div>
</template>
<script setup>
    import baseEchart from '@/base-ui/echarts/base-echart.vue'
    import card from '@/base-ui/card/card.vue'
    const options = {
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true,
                },
                dataView: {
                    show: true,
                    readOnly: false,
                },
                restore: {
                    show: true,
                },
                saveAsImage: {
                    show: true,
                },
            },
        },
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: [10, 160],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8,
                },
                data: [
                    {
                        value: 14,
                        name: '上衣',
                    },
                    {
                        value: 19,
                        name: '裤子',
                    },
                    {
                        value: 19,
                        name: '鞋子',
                    },
                    {
                        value: 18,
                        name: '厨具',
                    },
                    {
                        value: 18,
                        name: '家具',
                    },
                    {
                        value: 19,
                        name: '床上用品',
                    },
                    {
                        value: 35,
                        name: '女装',
                    },
                    {
                        value: 2,
                        name: 'Polo',
                    },
                    {
                        value: 3,
                        name: '电子数码产品',
                    },
                ],
                label: {
                    show: false,
                },
            },
        ],
    }
</script>
<style lang="less" scoped>
    .rose-echart-cls {
    }
</style>
