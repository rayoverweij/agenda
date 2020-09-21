import { RawDraftContentState } from "draft-js"

export type Day = {
    date: string,
    content: RawDraftContentState
}

export type DaySet = {
    [key: string]: Day
}