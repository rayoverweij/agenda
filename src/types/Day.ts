export type Day = {
    date: string,
    tasks: number[]
}

export type DaySet = {
    [key: string]: Day
}