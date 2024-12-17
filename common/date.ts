

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



export function getPreviousDay(dateString) {
    const date = new Date(dateString); // 将输入的日期字符串转换为 Date 对象
    date.setDate(date.getDate() - 1); // 设置日期为前一天

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零处理
    const day = String(date.getDate()).padStart(2, '0'); // 补零处理

    return `${year}-${month}-${day}`; // 格式化返回 YYYY-MM-DD
}


/**
* 返回结构化的日期字符串，例如 "2024-12-12"
* @param {string | Date} [inputDate] - 可选的日期字符串或 Date 对象，默认为当前日期
* @returns {string} - 格式化的日期字符串，例如 "2024-12-12"
*/
export function getDayRecordDateKey(inputDate) {
    const date = inputDate ? new Date(inputDate) : new Date(); // 如果未传入日期，使用当前日期

    // 确保日期有效
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date input. Please provide a valid date string or Date object.");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 补零，确保两位数
    const day = String(date.getDate()).padStart(2, "0"); // 补零，确保两位数

    return `${year}-${month}-${day}`;
}