<template>
    <div class="bar-echart-cls">
        <card title="分类商品的收藏">
            <base-echart :options="options" />
        </card>
    </div>
</template>
<script setup>
    import baseEchart from '@/base-ui/echarts/base-echart.vue'
    import card from '@/base-ui/card/card.vue'
    const options = {
        title: {
            text: '支持鼠标滚动缩放',
        },
        grid: {
            bottom: '5%',
        },
        xAxis: {
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
            axisLabel: {
                inside: true,
                color: '#fff',
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            z: 10,
        },
        yAxis: {
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#999',
            },
        },
        dataZoom: [
            {
                type: 'inside',
            },
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: {
                        colorStops: [
                            {
                                offset: 0,
                                color: '#83bff6',
                            },
                            {
                                offset: 0.5,
                                color: '#188df0',
                            },
                            {
                                offset: 1,
                                color: '#188df0',
                            },
                        ],
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        type: 'linear',
                        global: false,
                    },
                },
                emphasis: {
                    itemStyle: {
                        color: {
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2378f7',
                                },
                                {
                                    offset: 0.7,
                                    color: '#2378f7',
                                },
                                {
                                    offset: 1,
                                    color: '#83bff6',
                                },
                            ],
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            type: 'linear',
                            global: false,
                        },
                    },
                },
                data: [49749, 84754, 58283, 57354, 49002, 98579, 112268, 1983, 6924],
            },
        ],
    }
</script>
<style lang="less" scoped>
    .bar-echart-cls {
    }
</style>
