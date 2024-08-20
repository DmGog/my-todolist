import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT, TodolistDomainType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-a-p-i";
import {AppThunkDispatch} from "./store";


export type TaskStateType = { [key: string]: TaskType[] }

// типизация объектов action
export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    payload: {
        todolistId: string
        taskId: string
    }
}
export type RemoveAllTasksActionType = {
    type: "REMOVE-ALL-TASK"
    payload: {
        todolistId: string
    }
}
export type AddTaskActionType = ReturnType<typeof createTaskAC>

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    payload: {
        taskId: string
        status: TaskStatuses
        todolistId: string

    }
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    payload: {
        taskId: string
        title: string
        todolistId: string

    }
}


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | RemoveAllTasksActionType
    | SetTodolistsAT
    | SetTasksTodolistAT


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(e => e.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let task = action.payload.task
            return {...state, [task.todoListId]: state[task.todoListId] = [task, ...state[task.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const newIsDone = action.payload.status
            return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, status: newIsDone} : t)}
        }
        case "CHANGE-TASK-TITLE": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const newTitle = action.payload.title
            return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)}
        }
        case "ADD-TODOLIST": {
            // const stateCopy = {...state}
            // stateCopy[v1()] =[]
            const todolist: TodolistDomainType = {...action.payload.todolist, filter: "all"}
            return {...state, [todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        case "REMOVE-ALL-TASK": {
            const todolistId = action.payload.todolistId
            return {...state, [todolistId]: state[todolistId] = []}
        }

        case "SET-TODOLISTS": {
            // const copyState = {...state}
            // action.payload.todolists.forEach((r) => copyState[r.id] = [])
            // return copyState
            // return {...state, ...Object.fromEntries(action.payload.todolists.map(r => [r.id, []]))}

            return action.payload.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, state)
        }
        case "SET-TASKS": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId] = action.payload.tasks}
        }
        default:
            return state
    }
}

// создадим функции action creator для создания правильных обьектов action
export const deleteTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK", payload: {todolistId, taskId}
    }
}
export const createTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK", payload: {task}
    } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS", payload: {taskId, status, todolistId}
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE", payload: {taskId, title, todolistId}
    }
}

export const removeAllTasksAC = (todolistId: string): RemoveAllTasksActionType => {
    return {
        type: "REMOVE-ALL-TASK", payload: {todolistId}
    }
}


//----------------thunk

export const getTasksTodolistAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS", payload: {
            todolistId, tasks
        }
    } as const
}

export type SetTasksTodolistAT = ReturnType<typeof getTasksTodolistAC>

export const getTasksTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.getTodolistTasks(todolistId).then(res => {
            dispatch(getTasksTodolistAC(todolistId, res.data.items))
        })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.deleteTodolistTask(todolistId, taskId).then(res => {
            dispatch(deleteTaskAC(taskId, todolistId))
        })
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.createTodolistTask(todolistId, title).then(res => {
            dispatch(createTaskAC(res.data.data.item))
        })
    }
}
