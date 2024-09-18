import {authAPI, FieldsErrorsType, LoginParamsType} from "../../api/todolists-a-p-i";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../App/appSlice";
import {clearTodosData} from "../Todolists/todolist/todolistsSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const authTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: {
        errors: string[], fieldsErrors?: FieldsErrorsType[]
    }
}>("auth/login", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return
        } else {
            thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
            handleServerAppError(res.data, thunkAPI.dispatch)
            //@ts-ignore
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk("auth/logout", async (arg, thunkAPI) => {
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            thunkAPI.dispatch(clearTodosData())
            return
        } else {
            thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (err: any) {
        thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})


const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        authAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder => {
        builder.addCase(authTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
});
export const authReducer = slice.reducer
export const {authAC} = slice.actions


