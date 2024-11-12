<template>
    <div class="map-echart-cls">
        <card title="不同城市商品销量">
            <base-echart :options="options" />
        </card>
    </div>
</template>
<script setup>
    import baseEchart from '@/base-ui/echarts/base-echart.vue'
    import card from '@/base-ui/card/card.vue'
    const options = {
        backgroundColor: '#fff',
        title: {
            text: '全国销量统计',
            left: 'center',
            textStyle: {
                color: '#fff',
            },
        },
        tooltip: {
            trigger: 'item',
        },
        visualMap: {
            min: 0,
            max: 60000,
            left: 20,
            bottom: 20,
            calculable: true,
            text: ['高', '低'],
            inRange: {
                color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)'],
            },
            textStyle: {
                color: '#fff',
            },
        },
        geo: {
            map: 'china',
            roam: 'scale',
            emphasis: {
                areaColor: '#f4cccc',
                borderColor: 'rgb(9, 54, 95)',
                itemStyle: {
                    areaColor: '#f4cccc',
                },
            },
        },
        series: [
            {
                name: '销量',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: [
                    {
                        name: '上海',
                        value: [121.48, 31.22, 62239],
                    },
                    {
                        name: '南京',
                        value: [118.78, 32.04, 55683],
                    },
                    {
                        name: '郑州',
                        value: [113.65, 34.76, 53716],
                    },
                    {
                        name: '广州',
                        value: [113.23, 23.16, 6364],
                    },
                    {
                        name: '西安',
                        value: [108.95, 34.27, 64976],
                    },
                    {
                        name: '长沙',
                        value: [113, 28.21, 4142],
                    },
                    {
                        name: '昆明',
                        value: [102.73, 25.04, 9524],
                    },
                    {
                        name: '武汉',
                        value: [114.31, 30.52, 28212],
                    },
                    {
                        name: '重庆',
                        value: [106.54, 29.59, 60777],
                    },
                    {
                        name: '沈阳',
                        value: [123.38, 41.8, 20901],
                    },
                    {
                        name: '宁波',
                        value: [121.56, 29.86, 66584],
                    },
                    {
                        name: '苏州',
                        value: [120.62, 31.32, 1259],
                    },
                    {
                        name: '青岛',
                        value: [120.33, 36.07, 9021],
                    },
                    {
                        name: '成都',
                        value: [104.06, 30.67, 23378],
                    },
                    {
                        name: '北京',
                        value: [116.46, 39.92, 6107],
                    },
                    {
                        name: '天津',
                        value: [117.2, 39.13, 5096],
                    },
                    {
                        name: '深圳',
                        value: [114.07, 22.62, 14340],
                    },
                    {
                        name: '杭州',
                        value: [120.19, 30.26, 19654],
                    },
                    {
                        name: '无锡',
                        value: [120.29, 31.59, 6923],
                    },
                ],
                symbolSize: 12,
                emphasis: {
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                },
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75,
                tooltip: {
                    show: false,
                },
            },
        ],
    }
</script>
<style lang="less" scoped>
    .map-echart-cls {
    }
</style>
