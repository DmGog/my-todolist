import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {handleServerAppError, handleServerAppErrorTodo, handleServerNetworkError} from "../../../utils/error-utils";
import {RequestStatusType, setAppStatusAC} from "../../../App/appSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasks} from "./task/tasksSlice";

export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export type FilterType = "all" | "active" | "completed"

export const fetchTodosTC = createAsyncThunk("todolists/fetchTodolists", async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));

    try {
        const res = await todolistsAPI.getTodolists();
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
        // Запрос задач для каждого тудулиста
        for (const todo of res.data) {
            thunkAPI.dispatch(fetchTasks(todo.id));
        }
        return {todolists: res.data}; // Возвращаем данные
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
    }
});

export const deleteTodoTC = createAsyncThunk("todolists/deleteTodo", async (todolistId: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: "loading"}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return {id: todolistId}
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})


export const createTodoTC = createAsyncThunk("todolists/createTodo", async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode !== 0) {
            handleServerAppErrorTodo(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(changeTodolistEntityStatusAC({id: res.data.data.item.id, status: "failed"}))
            return thunkAPI.rejectWithValue(null)
        }
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolist: res.data.data.item}

    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }

})

export const updateTodoTitleTC = createAsyncThunk("todolists/updateTodoTitle", async (param: {
    todolistId: string,
    title: string
}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: "loading"}))
    try {
        const res = await todolistsAPI.updateTodolist(param.todolistId, param.title)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: "failed"}))
            return thunkAPI.rejectWithValue(null)
        }

        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: "succeeded"}))
        return {id: param.todolistId, title: param.title}
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "todolist",
    initialState: [] as TodolistDomainType[],
    reducers: {
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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodosTC.fulfilled, (state, action) => {
                return action.payload.todolists.map((e) => {
                    return {...e, filter: "all", entityStatus: "idle"}
                })
            })
            .addCase(deleteTodoTC.fulfilled, (state, action) => {
                const index = state.findIndex((e) => e.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(createTodoTC.fulfilled, (state, action) => {
                state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(updateTodoTitleTC.fulfilled, (state,action)=>{
                const index = state.findIndex((e) => e.id === action.payload.id)
                if (index > -1) {
                    state[index].title = action.payload.title
                }
            })
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    clearTodosData
} = slice.actions
