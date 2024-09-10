import {
    clearTodosData, createTodolistAC,
    deleteTodolistAC, getTodolistsAC,

} from "../todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../../../api/todolists-a-p-i";

import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {AppRootState, AppThunkDispatch} from "../../../../App/store";
import {setAppStatusAC} from "../../../../App/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TaskStateType = { [key: string]: TaskType[] }
const initialState: TaskStateType = {}
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {

            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        createTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{
            taskId: string,
            model: UpdateDomainTaskModelType,
            todolistId: string
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        getTasksTodolistAC(state, action: PayloadAction<{
            todolistId: string, tasks: TaskType[]
        }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: builder => {
        builder.addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(getTodolistsAC, (state, action) => {
            action.payload.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, state)
        })
        builder.addCase(clearTodosData, (state, action) => {
            return {}
        })
    }
})

export const tasksReducer = slice.reducer

export const {deleteTaskAC, getTasksTodolistAC, updateTaskAC,  createTaskAC} = slice.actions

export const getTasksTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.getTodolistTasks(todolistId).then(res => {
            dispatch(getTasksTodolistAC({todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.deleteTodolistTask(todolistId, taskId).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(deleteTaskAC({taskId, todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.createTodolistTask(todolistId, title).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(createTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, modelDomain: UpdateDomainTaskModelType) => {
    return (dispatch: AppThunkDispatch, getState: () => AppRootState) => {

        const state = getState()
        const task = state.tasks[todolistId].find(e => e.id === taskId)
        if (!task) {
            console.warn("task undefined")
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            status: task.status,
            description: task.description,
            startDate: task.startDate,
            priority: task.priority,
            ...modelDomain
        }

        todolistsAPI.updateTodolistTask(todolistId, taskId, apiModel).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({taskId, model: apiModel, todolistId}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
