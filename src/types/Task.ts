import { RawDraftContentState } from "draft-js"

export type Task = {
    id: string,
    date: string,
    content: RawDraftContentState,
    highlight: boolean
}