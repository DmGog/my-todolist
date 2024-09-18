import {authAPI} from "../api/todolists-a-p-i";
import {authAC} from "../features/Login/authSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export const initializedAppTC = createAsyncThunk("app/initialized", async (arg, thunkAPI) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(authAC({isLoggedIn: true}))
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(initializedAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC} = slice.actions
