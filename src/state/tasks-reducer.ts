import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-a-p-i";

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
export type AddTaskActionType = {
    type: "ADD-TASK"
    payload: {
        todolistId: string
        title: string
    }
}

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
    | AddTodolistActionType | RemoveTodolistActionType | RemoveAllTasksActionType | SetTodolistsAT


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
            const todolistId = action.payload.todolistId
            let task = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                todoListId: action.payload.todolistId,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Hi,
            }
            return {...state, [todolistId]: state[todolistId] = [task, ...state[todolistId]]}
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
            return {...state, [action.payload.todolistId]: []}
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
            // action.payload.todolists.forEach(r => copyState[r.id] = [])
            // return copyState
            // return {...state, ...Object.fromEntries(action.payload.todolists.map(r => [r.id, []]))}

            return action.payload.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, state)
        }
        default:
            return state
    }
}

// создадим функции action creator для создания правильных обьектов action
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK", payload: {todolistId, taskId}
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK", payload: {title, todolistId}
    }
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