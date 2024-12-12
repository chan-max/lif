


/**
 * @description 记录睡眠相关 
*/


export interface DayrecordSleep {
    type: 'sleep',
    start: Date,
    end: Date,
    duration: number,
}