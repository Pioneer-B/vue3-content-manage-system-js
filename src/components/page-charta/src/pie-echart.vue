<template>
    <div class="pie-echart-cls">
        <card title="分类商品数量(饼图)">
            <base-echart :options="options" />
        </card>
    </div>
</template>
<script setup>
    import baseEchart from '@/base-ui/echarts/base-echart.vue'
    import card from '@/base-ui/card/card.vue'

    const options = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                bottom: '-10%',
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
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }
</script>
<style lang="less" scoped>
    .pie-echart-cls {
    }
</style>
