import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-a-p-i";
import {authAC} from "../features/Login/authSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }

    }
})

export const appReducer = slice.reducer
export const {setAppInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions
export const initializedAppTC = () => (dispatch: Dispatch) => {

    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(authAC({isLoggedIn: true}))
        } else {
            dispatch(authAC({isLoggedIn: false}))
        }
        dispatch(setAppInitializedAC({isInitialized: true}))
    })
}