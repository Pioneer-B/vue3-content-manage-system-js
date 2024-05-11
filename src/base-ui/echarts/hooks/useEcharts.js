import * as echarts from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson)

export function useEcharts(domEl, theme = 'light') {
    // 初始化echarts
    const echartsInstance = echarts.init(domEl, theme, { renderer: 'svg' })

    // 设置options
    const setOptions = (options) => {
        echartsInstance.setOption(options)
    }

    // 监听window尺寸的变化
    window.addEventListener('resize', () => {
        echartsInstance.resize()
    })

    return { setOptions }
}
