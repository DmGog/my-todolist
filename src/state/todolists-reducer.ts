import {todolistsAPI, TodolistType} from "../api/todolists-a-p-i";
import {AppThunkDispatch} from "./store";

export type TodolistDomainType = TodolistType & { filter: FilterType }

export type FilterType = "all" | "active" | "completed"


//  action
export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAT = ReturnType<typeof createTodolistAC>

export type UpdateTodolistTitleAT = ReturnType<typeof updateTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterActionAC>
export type SetTodosAT = ReturnType<typeof getTodolistsAC>

type ActionsType =
    | DeleteTodolistAT
    | CreateTodolistAT
    | UpdateTodolistTitleAT
    | ChangeTodolistFilterActionType | SetTodosAT


const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(e => e.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            const todolist: TodolistDomainType = {...action.payload.todolist, filter: "all"}
            return [...state, todolist]
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => {
                return tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl
            })
        }
        case "SET-TODOLISTS": {
            return action.payload.todolists.map((e) => {
                return {...e, filter: "all"}
            })
        }

        default:
            return state
    }
}


// action creator
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST", payload: {id: todolistId}
    } as const
}
export const createTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST", payload: {todolist}
    } as const
}
export const updateTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE", payload: {title, id}
    } as const
}
export const changeTodolistFilterActionAC = (id: string, filter: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER", payload: {id, filter}
    } as const
}
export const getTodolistsAC = (todolists: TodolistType[]) => (
    {
        type: "SET-TODOLISTS", payload: {todolists}
    } as const
)

// ------------------ thunk


export const getTodosTC = () => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.getTodolists().then(res => {
            dispatch(getTodolistsAC(res.data))
        })
    }
}

export const deleteTodoTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            dispatch(deleteTodolistAC(todolistId))
        })
    }
}

export const createTodoTC = (title: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.createTodolist(title).then(res => {
            dispatch(createTodolistAC(res.data.data.item))
        })
    }
}

export const updateTodoTitleTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.updateTodolist(todolistId, title).then((res) => {
            dispatch(updateTodolistTitleAC(todolistId, title))
        })
    }
}