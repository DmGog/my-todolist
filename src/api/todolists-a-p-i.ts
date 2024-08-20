import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "efec5740-0aa3-4e1a-8682-caa77b0b5ed1"
    }
}

const instance = axios.create(
    {
        baseURL: "https://social-network.samuraijs.com/api/1.1/",
        ...settings,
    }
)

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}

type FieldErrorType = {
    error: string
    field: string
}

// ---------------------- TASKS
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type ResponseTaskType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTodolistTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTodolistTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTodolistTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}