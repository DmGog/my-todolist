import {CreateTodolistAT, DeleteTodolistAT, SetTodosAT, TodolistDomainType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-a-p-i";
import {AppRootState, AppThunkDispatch} from "./store";


export type TaskStateType = { [key: string]: TaskType[] }

// action
export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type RemoveAllTasksActionType = {
    type: "REMOVE-ALL-TASK"
    payload: {
        todolistId: string
    }
}
export type CreateTaskAT = ReturnType<typeof createTaskAC>
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>


type ActionsType =
    DeleteTaskAT
    | CreateTaskAT
    | UpdateTaskAT
    | CreateTodolistAT
    | DeleteTodolistAT
    | RemoveAllTasksActionType
    | SetTodosAT
    | SetTasksTodolistAT


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
            return {...state, [task.todoListId]: state[task.todoListId] = [task, ...state[task.todoListId]]}
        }
        case "UPDATE-TASK": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const model = action.payload.model
            return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, ...model} : t)}
        }
        case "ADD-TODOLIST": {
            const todolist: TodolistDomainType = {...action.payload.todolist, filter: "all"}
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
            // const copyState = {...state}
            // action.payload.todolists.forEach((r) => copyState[r.id] = [])
            // return copyState
            // return {...state, ...Object.fromEntries(action.payload.todolists.map(r => [r.id, []]))}

            return action.payload.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, state)
        }
        case "SET-TASKS": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId] = action.payload.tasks}
        }
        default:
            return state
    }
}

// action creator
export const deleteTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK", payload: {todolistId, taskId}
    } as const
}
export const createTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK", payload: {task}
    } as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: "UPDATE-TASK", payload: {taskId, model, todolistId}
    } as const
}

export const removeAllTasksAC = (todolistId: string): RemoveAllTasksActionType => {
    return {
        type: "REMOVE-ALL-TASK", payload: {todolistId}
    } as const
}


//----------------thunk

export const getTasksTodolistAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS", payload: {
            todolistId, tasks
        }
    } as const
}
export type SetTasksTodolistAT = ReturnType<typeof getTasksTodolistAC>
export const getTasksTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.getTodolistTasks(todolistId).then(res => {
            dispatch(getTasksTodolistAC(todolistId, res.data.items))
        })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.deleteTodolistTask(todolistId, taskId).then(res => {
            dispatch(deleteTaskAC(taskId, todolistId))
        })
    }
}
export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistsAPI.createTodolistTask(todolistId, title).then(res => {
            dispatch(createTaskAC(res.data.data.item))
        })
    }
}
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
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
            dispatch(updateTaskAC(taskId, apiModel, todolistId))
        })
    }
}
