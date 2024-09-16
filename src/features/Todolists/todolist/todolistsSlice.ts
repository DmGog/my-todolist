import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {handleServerAppError, handleServerAppErrorTodo, handleServerNetworkError} from "../../../utils/error-utils";
import {RequestStatusType, setAppStatusAC} from "../../../App/appSlice";
import {AppThunkDispatch} from "../../../App/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasks} from "./task/tasksSlice";

const initialState: TodolistDomainType[] = []
export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export type FilterType = "all" | "active" | "completed"

const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        getTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map((e) => {
                return {...e, filter: "all", entityStatus: "idle"}
            })
        },
        deleteTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex((e) => e.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        createTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        updateTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex((e) => e.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
            const index = state.findIndex((e) => e.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex((e) => e.id === action.payload.id)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        clearTodosData(state, action: PayloadAction) {
            return []
        }
    }
})

export const todolistsReducer = slice.reducer
export const {
    getTodolistsAC,
    deleteTodolistAC,
    changeTodolistFilterAC,
    createTodolistAC,
    updateTodolistTitleAC,
    changeTodolistEntityStatusAC,
    clearTodosData
} = slice.actions

export const getTodosTC = () => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(getTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
                return res.data
            })
            .then((todos) => {
                todos.forEach((todo) => {
                    dispatch(fetchTasks(todo.id))
                })
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const deleteTodoTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(deleteTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const createTodoTC = (title: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.createTodolist(title).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppErrorTodo(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({id: res.data.data.item.id, status: "failed"}))
            }
            dispatch(createTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const updateTodoTitleTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
        todolistsAPI.updateTodolist(todolistId, title).then((res) => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "failed"}))
            }
            dispatch(updateTodolistTitleAC({id: todolistId, title}))
            dispatch(setAppStatusAC({status: "succeeded"}))
            dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "succeeded"}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
