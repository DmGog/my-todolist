import {clearTodosData, createTodoTC, deleteTodoTC, fetchTodosTC,} from "../todolistsSlice";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../../../api/todolists-a-p-i";

import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {AppRootState} from "../../../../App/store";
import {setAppStatusAC} from "../../../../App/appSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export type TaskStateType = { [key: string]: TaskType[] }
const initialState: TaskStateType = {}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    let res = await todolistsAPI.getTodolistTasks(todolistId);
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {todolistId, tasks: res.data.items}
})

export const removeTask = createAsyncThunk("tasks/deleteTask", async (param: {
    todolistId: string,
    taskId: string
}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    await todolistsAPI.deleteTodolistTask(param.todolistId, param.taskId);
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {taskId: param.taskId, todolistId: param.todolistId}
})

export const createTaskTC = createAsyncThunk("tasks/createTask", async (param: {
    todolistId: string,
    title: string
}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistsAPI.createTodolistTask(param.todolistId, param.title)
        if (res.data.resultCode !== 0) {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return {task: res.data.data.item}
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: {
    todolistId: string,
    taskId: string,
    modelDomain: UpdateDomainTaskModelType
}, thunkAPI) => {

    const state = thunkAPI.getState() as AppRootState
    const task = state.tasks[param.todolistId].find(e => e.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue("task is undefined")
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        status: task.status,
        description: task.description,
        startDate: task.startDate,
        priority: task.priority,
        ...param.modelDomain
    }
    try {
        const res = await todolistsAPI.updateTodolistTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            return {taskId: param.taskId, model: param.modelDomain, todolistId: param.todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})


const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createTodoTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodoTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(fetchTodosTC.fulfilled, (state, action) => {
                action.payload.todolists.reduce((acc, tl) => {
                    acc[tl.id] = []
                    return acc
                }, state)
            })
            .addCase(clearTodosData, () => {
                return {}
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(createTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
    }
})

export const tasksReducer = slice.reducer



