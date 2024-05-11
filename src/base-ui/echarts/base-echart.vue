<template>
    <div class="base-echart-cls">
        <div class="echart" ref="echartDivRef" :style="{ width: width, height: height }"></div>
    </div>
</template>
<script setup>
    import { onMounted, watchEffect, ref } from 'vue'
    import { useEcharts } from './hooks/useEcharts'

    const props = defineProps({
        options: {
            type: Object,
            default: () => {},
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '350px',
        },
    })

    const echartDivRef = ref()
    onMounted(() => {
        const { setOptions } = useEcharts(echartDivRef.value)

        watchEffect(() => {
            setOptions(props.options)
        })
    })
</script>
<style lang="less" scoped>
    .base-echart-cls {
        .echart {
            background-color: #fff;
        }
    }
</style>
