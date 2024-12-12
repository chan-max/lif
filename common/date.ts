

export function formatDate(input: any, format = 'YYYY-MM-DD HH:mm:ss') {
    // 如果输入是字符串，尝试转换为 Date 对象
    let date = typeof input === 'string' ? new Date(input) : input;

    // 检查日期是否有效
    if (!(date instanceof Date) || isNaN(date as any)) {
        throw new Error('Invalid date input');
    }

    // 提取日期和时间组件
    const components: any = {
        YYYY: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        DD: String(date.getDate()).padStart(2, '0'),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0'),
        ms: String(date.getMilliseconds()).padStart(3, '0'),
    };

    // 替换格式字符串中的标记
    return format.replace(/YYYY|MM|DD|HH|mm|ss|ms/g, match => components[match]);
}