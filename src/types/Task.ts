import { RawDraftContentState } from "draft-js"

export type Task = {
    id: number,
    content: RawDraftContentState
}

export type TaskSet = {
    [key: number]: Task
}