import {CreateTodolistAT, DeleteTodolistAT, SetTodosAT, TodolistDomainType} from "../todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../../../api/todolists-a-p-i";
import {AppRootState, AppThunkDispatch} from "../../../../AppWithRedux/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../AppWithRedux/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";


export type TaskStateType = { [key: string]: TaskType[] }
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
            return {...state, [task.todoListId]: [task, ...state[task.todoListId]]}
        }
        case "UPDATE-TASK": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const model = action.payload.model
            return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, ...model} : t)}
        }
        case "ADD-TODOLIST": {
            const todolist: TodolistDomainType = {...action.payload.todolist, filter: "all", entityStatus: "idle"}
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
            return action.payload.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, state)
        }
        case "SET-TASKS": {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        default:
            return state
    }
}


// action

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type RemoveAllTasksActionType = ReturnType<typeof removeAllTasksAC>
export type CreateTaskAT = ReturnType<typeof createTaskAC>
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>
export type SetTasksTodolistAT = ReturnType<typeof getTasksTodolistAC>
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    DeleteTaskAT
    | CreateTaskAT
    | UpdateTaskAT
    | CreateTodolistAT
    | DeleteTodolistAT
    | RemoveAllTasksActionType
    | SetTodosAT
    | SetTasksTodolistAT


// action creator

export const deleteTaskAC = (taskId: string, todolistId: string) => ({
        type: "REMOVE-TASK", payload: {todolistId, taskId}
    } as const
)
export const createTaskAC = (task: TaskType) => ({
        type: "ADD-TASK", payload: {task}
    } as const
)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
        type: "UPDATE-TASK", payload: {taskId, model, todolistId}
    } as const
)
export const removeAllTasksAC = (todolistId: string) => ({
        type: "REMOVE-ALL-TASK", payload: {todolistId}
    } as const
)
export const getTasksTodolistAC = (todolistId: string, tasks: TaskType[]) => ({
    type: "SET-TASKS", payload: {todolistId, tasks}
} as const)


//----------------thunk


export const getTasksTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolistTasks(todolistId).then(res => {
            dispatch(getTasksTodolistAC(todolistId, res.data.items))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.deleteTodolistTask(todolistId, taskId).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(deleteTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolistTask(todolistId, title).then(res => {
            if (res.data.resultCode !== 0) {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(createTaskAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
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
                dispatch(updateTaskAC(taskId, apiModel, todolistId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
