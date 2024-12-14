


export enum Daycords {
    // 睡眠
    SLEEP = 'sleep',

    // 饮食
    DIET = 'diet',

    // 身高
    HEIGHT = 'height',

    // 体重
    WEIGHT = 'weight',

    // 步数
    WALK = 'walk',

    // 饮水
    WATER = 'water',

    // 心率脉搏
    PULSE = 'pulse',


    // 心情
    MOOD = 'mood'
}


/**
 * @define 所有记录类型
*/
export const RecordTypeOptions = [
    {
        type: 'sleep',
        label: '睡眠',
        logo: '/img/record/sleep.svg'
    },
    {
        type: 'diet',
        label: '饮食',
        logo: '/img/record/diet.svg'
    },
    {
        type: 'water',
        label: '饮水',
        logo: '/img/record/water.svg'
    },
    {
        type: 'walk',
        logo: '/img/record/walk.svg',
        label: '步数'
    },
    {
        type: 'height',
        logo: '/img/record/height.svg',
        label: '身高'
    },
    {
        type: 'weight',
        label: '体重',
        logo: '/img/record/weight.svg',
    },
    {
        type: 'pulse',
        label: '心率',
        logo: '/img/record/pulse.svg',
    },

    {
        type: 'mood',
        label: '心情',
        logo: '/img/record/mood.svg',
    },

    {
        type: 'feeling',
        label: '感觉',
        logo: '/img/record/feeling.svg',
    },

    {
        type: 'period',
        label: '女生生理期',
        logo: '/img/record/period.svg',
    },
]


export function getRecordTypeOptionByType(type: string) {

    if (!type) {
        console.error('record type is empty ')
        return {
            type: 'unknown',
            label: '未知类型',
            logo: '/img/record/unknown.svg'
        }
    }

    return RecordTypeOptions.find((item) => item.type == type)
}


// 所有可能出现的心情
export const moodOptions = [
    { type: 'happy', label: '高兴' },
    { type: 'excited', label: '兴奋' },
    { type: 'content', label: '满足' },
    { type: 'calm', label: '平静' },
    { type: 'relaxed', label: '放松' },
    { type: 'grateful', label: '感激' },
    { type: 'optimistic', label: '乐观' },
    { type: 'proud', label: '自豪' },
    { type: 'hopeful', label: '充满希望' },
    { type: 'joyful', label: '喜悦' },

    { type: 'neutral', label: '中立' },
    { type: 'bored', label: '无聊' },
    { type: 'tired', label: '疲惫' },
    { type: 'confused', label: '困惑' },
    { type: 'curious', label: '好奇' },
    { type: 'thoughtful', label: '深思' },

    { type: 'sad', label: '悲伤' },
    { type: 'lonely', label: '孤独' },
    { type: 'anxious', label: '焦虑' },
    { type: 'fearful', label: '害怕' },
    { type: 'guilty', label: '内疚' },
    { type: 'ashamed', label: '羞愧' },
    { type: 'frustrated', label: '沮丧' },
    { type: 'angry', label: '愤怒' },
    { type: 'jealous', label: '嫉妒' },
    { type: 'resentful', label: '愤恨' },

    { type: 'nostalgic', label: '怀旧' },
    { type: 'bittersweet', label: '苦乐参半' },
    { type: 'embarrassed', label: '尴尬' },
    { type: 'insecure', label: '不安' },
    { type: 'overwhelmed', label: '不堪重负' },

    { type: 'satisfied', label: '满意' },
    { type: 'inspired', label: '被激励' },
    { type: 'empowered', label: '充满力量' },
    { type: 'hopeful-yet-anxious', label: '既充满希望又焦虑' },

    { type: 'stressed', label: '压力大' },
    { type: 'peaceful', label: '安宁' },
    { type: 'melancholic', label: '忧郁' },
    { type: 'determined', label: '坚定' },
    { type: 'motivated', label: '有动力' },

    { type: 'relieved', label: '如释重负' },
    { type: 'exhausted', label: '精疲力尽' },
    { type: 'curious-yet-nervous', label: '既好奇又紧张' }
];


// 感受选项
export const feelingOptions = [
    { type: 'tired', label: '疲劳' },
    { type: 'relaxed', label: '放松' },
    { type: 'painful', label: '疼痛' },
    { type: 'sore', label: '酸痛' },
    { type: 'stiff', label: '僵硬' },
    { type: 'numb', label: '麻木' },
    { type: 'itchy', label: '瘙痒' },
    { type: 'weak', label: '乏力' },
    { type: 'heavy', label: '沉重' },
    { type: 'energized', label: '充满活力' },
    { type: 'light', label: '轻松' },
    { type: 'tense', label: '紧张' },
    { type: 'cold', label: '寒冷' },
    { type: 'hot', label: '炎热' },
    { type: 'sweaty', label: '出汗' },
    { type: 'dry', label: '干燥' },
    { type: 'wet', label: '湿润' },
    { type: 'shaky', label: '颤抖' },
    { type: 'dizzy', label: '头晕' },
    { type: 'chilly', label: '冷飕飕' },
    { type: 'warm', label: '温暖' },
    { type: 'bloated', label: '胀气' },
    { type: 'hungry', label: '饥饿' },
    { type: 'full', label: '饱胀' },
    { type: 'thirsty', label: '口渴' },
    { type: 'sleepy', label: '困倦' },
    { type: 'restless', label: '坐立不安' },
    { type: 'cramped', label: '抽筋' },
    { type: 'tingling', label: '刺痛' },
    { type: 'swollen', label: '肿胀' },
    { type: 'breathless', label: '呼吸急促' },
    { type: 'burning', label: '灼热' },
    { type: 'stinging', label: '刺痛' },
    { type: 'aching', label: '隐隐作痛' },
    { type: 'sharp-pain', label: '剧痛' },
    { type: 'fluttering', label: '心慌' },
    { type: 'comfortable', label: '舒适' },
    { type: 'uncomfortable', label: '不适' }
];










