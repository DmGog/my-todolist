import {authAPI, FieldsErrorsType, LoginParamsType} from "../../api/todolists-a-p-i";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunkDispatch} from "../../App/store";
import {setAppStatusAC} from "../../App/appSlice";
import {clearTodosData} from "../Todolists/todolist/todolistsSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const authTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, {
    rejectValue: {
        errors: string[], fieldsErrors?: FieldsErrorsType[]
    }
}>("auth/login", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {isLoggedIn: true}
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
        builder.addCase(authTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
});
export const authReducer = slice.reducer
export const {authAC} = slice.actions


export const logoutTC = () => (dispatch: AppThunkDispatch) => {
    authAPI.logOut().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(authAC({isLoggedIn: false}))
            dispatch(setAppStatusAC({status: "succeeded"}))
            dispatch(clearTodosData())
        } else {
            dispatch(setAppStatusAC({status: "failed"}))
            handleServerAppError(res.data, dispatch)
        }

    }).catch((err) => {
        dispatch(setAppStatusAC({status: "failed"}))
        handleServerNetworkError(err, dispatch)
    })
}
