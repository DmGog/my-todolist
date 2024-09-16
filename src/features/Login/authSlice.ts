import {authAPI, LoginParamsType} from "../../api/todolists-a-p-i";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunkDispatch} from "../../App/store";
import {setAppStatusAC} from "../../App/appSlice";
import {clearTodosData} from "../Todolists/todolist/todolistsSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}
const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        authAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
});
export const authReducer = slice.reducer
export const {authAC} = slice.actions


export const authTC = (data: LoginParamsType) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authAC({isLoggedIn: true}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            dispatch(setAppStatusAC({status: "failed"}))
            handleServerAppError(res.data, dispatch)
        }

    }).catch((err) => {
        dispatch(setAppStatusAC({status: "failed"}))
        handleServerNetworkError(err, dispatch)
    })
}

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