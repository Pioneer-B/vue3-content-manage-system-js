<template>
    <div class="line-echart-cls">
        <card title="分类商品的销量">
            <base-echart :options="options" />
        </card>
    </div>
</template>
<script setup>
    import baseEchart from '@/base-ui/echarts/base-echart.vue'
    import card from '@/base-ui/card/card.vue'
    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [
                    '上衣',
                    '裤子',
                    '鞋子',
                    '厨具',
                    '家具',
                    '床上用品',
                    '女装',
                    'Polo',
                    '电子数码产品',
                ],
            },
        ],
        yAxis: [
            {
                type: 'value',
            },
        ],
        series: [
            {
                name: '分类销量统计',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series',
                },
                data: [49749, 84754, 58283, 57354, 49002, 98579, 112268, 1983, 6924],
            },
        ],
    }
</script>
<style lang="less" scoped>
    .line-echart-cls {
    }
</style>
