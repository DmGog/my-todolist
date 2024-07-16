import {FilterType, TodolistType} from "../common/PropsType";
import {v1} from "uuid";
// типизация объектов action
export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        id: string
        filter: FilterType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(e => e.id !== action.payload.id)
        }

        case "ADD-TODOLIST":
            return [...state, {
                id: action.payload.todolistId, title:
                action.payload.title, filter: "all"
            }]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => {
                return tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl
            })

        default:
            throw new Error("I dont type")
    }
}


// создадим функции action creator для создания правильных обьектов action
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST", payload: {id: todolistId}
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST", payload: {title, todolistId: v1()}
    }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE", payload: {title, id}
    }
}
export const changeTodolistFilterActionAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER", payload: {id, filter}
    }
}