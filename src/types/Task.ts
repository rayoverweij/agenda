import { RawDraftContentState } from "draft-js"

export type Task = {
    id: number,
    content: RawDraftContentState,
    highlight: boolean
}

export type TaskSet = {
    [key: number]: Task
}