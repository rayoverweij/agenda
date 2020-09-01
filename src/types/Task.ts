export type Task = {
    id: number,
    content: string
}

export type TaskSet = {
    [key: number]: Task
}