// 使用dayjs将utc时间 格式化为用户能看懂的形式
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 如果需要设置本地化，可以导入相应的本地化文件
// 这里你还可以导入其他 dayjs 的插件，根据需要选择导入
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatDateTime(dateTimeString) {
    return dayjs.utc(dateTimeString).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}
