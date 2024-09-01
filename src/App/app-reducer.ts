import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-a-p-i";
import {authAC} from "../features/Login/auth-reducer";

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.initialized}
        }
        default:
            return state
    }
}

type ActionsType = SetAppErrorAT | SetAppStatusAT | SetAppInitializedAT
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>

export const setAppErrorAC = (error: string | null) => ({
    type: "APP/SET-ERROR",
    error
} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET-STATUS",
    status
} as const)

export const setAppInitializedAC = (initialized: boolean) => ({
    type: "APP/SET-INITIALIZED",
    initialized
} as const)

export const initializedAppTC = () => (dispatch: Dispatch) => {

    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(authAC(true))
        } else {
            dispatch(authAC(false))
        }
        dispatch(setAppInitializedAC(true))
    })
}