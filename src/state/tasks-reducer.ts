import {TaskStateType} from "../common/PropsType";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

// типизация объектов action
export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    payload: {
        todolistId: string
        taskId: string
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
        isDone: boolean
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
    | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(e => e.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const todolistId = action.payload.todolistId
            let task = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [todolistId]: state[todolistId] = [task, ...state[todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const newIsDone = action.payload.isDone
            return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)}
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
        default:
            throw new Error("I dont type")
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
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS", payload: {taskId, isDone, todolistId}
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE", payload: {taskId, title, todolistId}
    }
}