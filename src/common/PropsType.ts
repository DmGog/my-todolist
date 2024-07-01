export type myTasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string]: myTasksType[]
}