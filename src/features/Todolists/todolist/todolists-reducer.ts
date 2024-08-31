import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {AppThunkDispatch} from "../../../AppWithRedux/store";
import {RequestStatusType, setAppStatusAC} from "../../../AppWithRedux/app-reducer";
import {handleServerAppError, handleServerAppErrorTodo, handleServerNetworkError} from "../../../utils/error-utils";


const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(e => e.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            const todolist: TodolistDomainType = {...action.payload.todolist, filter: "all", entityStatus: "idle"}
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
                return {...e, filter: "all", entityStatus: "idle"}
            })
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => {
                return tl.id === action.payload.todoId ? {...tl, entityStatus: action.payload.status} : tl
            })
        }

        default:
            return state
    }
}
export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }

export type FilterType = "all" | "active" | "completed"

//  action

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAT = ReturnType<typeof createTodolistAC>

export type UpdateTodolistTitleAT = ReturnType<typeof updateTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodosAT = ReturnType<typeof getTodolistsAC>
type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
    | DeleteTodolistAT
    | CreateTodolistAT
    | UpdateTodolistTitleAT
    | ChangeTodolistFilterActionType | SetTodosAT | ChangeTodolistEntityStatusAT


// action creator

export const deleteTodolistAC = (todolistId: string) => ({
        type: "REMOVE-TODOLIST", payload: {id: todolistId}
    } as const
)
export const createTodolistAC = (todolist: TodolistType) => ({
    type: "ADD-TODOLIST", payload: {todolist}
} as const)
export const updateTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE", payload: {title, id}
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: "CHANGE-TODOLIST-FILTER", payload: {id, filter}
} as const)
export const getTodolistsAC = (todolists: TodolistType[]) => (
    {type: "SET-TODOLISTS", payload: {todolists}} as const)
export const changeTodolistEntityStatusAC = (todoId: string, status: RequestStatusType) => (
    {
        type: "CHANGE-TODOLIST-ENTITY-STATUS", payload: {
            todoId,
            status
        }
    } as const)

// ------------------ thunk

export const getTodosTC = () => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists().then(res => {
            dispatch(getTodolistsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const deleteTodoTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(deleteTodolistAC(todolistId))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const createTodoTC = (title: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppErrorTodo(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC(res.data.data.item.id, "failed"))
            }
            dispatch(createTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const updateTodoTitleTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistsAPI.updateTodolist(todolistId, title).then((res) => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistId, "failed"))
            }
            dispatch(updateTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
