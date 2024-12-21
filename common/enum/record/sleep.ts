


/**
 * @description 记录睡眠相关 
*/


export interface DayrecordSleep {
    type: 'sleep',
    startTime: Date,
    endTime: Date,
    duration: number,
}



// 睡眠类型
// 睡眠类型
export const sleepCategories = [
    {
        key: 'extremely_short_sleep',  // 唯一标识
        category: '极短睡眠',
        minMilliseconds: 0,  // 0秒
        maxMilliseconds: 4 * 60 * 60 * 1000,  // 4小时 = 4 * 60 * 60 * 1000 毫秒
        description: '极短睡眠（0到4小时）：极度不健康的睡眠时长，严重影响身体和心理健康，长期如此会引起免疫力下降、认知功能衰退等问题。',
        color: '#FF4D4D',  // 红色：代表警示和危险
    },
    {
        key: 'short_sleep',  // 唯一标识
        category: '短睡眠',
        minMilliseconds: 4 * 60 * 60 * 1000,  // 4小时 = 4 * 60 * 60 * 1000 毫秒
        maxMilliseconds: 6 * 60 * 60 * 1000,  // 6小时 = 6 * 60 * 60 * 1000 毫秒
        description: '短睡眠（4到6小时）：短时间睡眠，不足以提供足够的恢复，可能导致疲劳积累、免疫力下降、认知功能衰退等。',
        color: '#FF9900',  // 橙色：代表注意和不足
    },
    {
        key: 'short_nap',  // 唯一标识
        category: '短时小睡',
        minMilliseconds: 10 * 60 * 1000,  // 10分钟 = 10 * 60 * 1000 毫秒
        maxMilliseconds: 60 * 60 * 1000,   // 1小时 = 60 * 60 * 1000 毫秒
        description: '短时小睡（10分钟到1小时）：适合快速恢复精力，帮助提高警觉性和集中力，通常在白天进行，能有效缓解轻微疲劳。',
        color: '#FFD700',  // 金黄色：代表活力和恢复
    },
    {
        key: 'nap',  // 唯一标识
        category: '午睡',
        minMilliseconds: 30 * 60 * 1000,  // 30分钟 = 30 * 60 * 1000 毫秒
        maxMilliseconds: 2 * 60 * 60 * 1000,  // 2小时 = 2 * 60 * 60 * 1000 毫秒
        description: '午睡（30分钟到2小时）：午睡有助于恢复精力、提高警觉性、增强记忆力，通常在白天进行。适当的午睡能提高工作效率和学习能力。',
        color: '#85E085',  // 浅绿色：代表轻松和恢复
    },
    {
        key: 'normal_sleep',  // 唯一标识
        category: '正常睡眠',
        minMilliseconds: 7 * 60 * 60 * 1000,  // 7小时 = 7 * 60 * 60 * 1000 毫秒
        maxMilliseconds: 9 * 60 * 60 * 1000,  // 9小时 = 9 * 60 * 60 * 1000 毫秒
        description: '正常睡眠（7到9小时）：理想的睡眠时长，帮助恢复体力、增强免疫力、改善情绪与认知功能，保持身体和心理健康。',
        color: '#00CCFF',  // 蓝色：代表健康和宁静
    },
    {
        key: 'long_sleep',  // 唯一标识
        category: '长睡眠',
        minMilliseconds: 9 * 60 * 60 * 1000,  // 9小时 = 9 * 60 * 60 * 1000 毫秒
        maxMilliseconds: 12 * 60 * 60 * 1000,  // 12小时 = 12 * 60 * 60 * 1000 毫秒
        description: '长睡眠（9到12小时）：虽然有助于身体恢复，但长期过度睡眠可能与某些健康问题（如抑郁症、心血管疾病等）相关。',
        color: '#B266FF',  // 紫色：代表深度和过度
    },
    {
        key: 'restorative_sleep',  // 唯一标识
        category: '恢复性睡眠',
        minMilliseconds: 9 * 60 * 60 * 1000,  // 9小时 = 9 * 60 * 60 * 1000 毫秒
        maxMilliseconds: 24 * 60 * 60 * 1000,  // 超过 9 小时
        description: '恢复性睡眠（超过9小时）：当身体处于极度疲劳或疾病恢复期时，通常需要超过 9 小时的睡眠，帮助快速恢复体力和免疫系统。',
        color: '#3366FF',  // 深蓝色：代表深度恢复和放松
    },
];



