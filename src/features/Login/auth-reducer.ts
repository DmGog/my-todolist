import {authAPI, LoginParamsType} from "../../api/todolists-a-p-i";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunkDispatch} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "LOGIN/SET_LOGIN": {
            return {...state, isLoggedIn: action.isLoggedIn};
        }
        default:
            return state
    }

}

type InitialStateType = {
    isLoggedIn: boolean
}

type ActionsType = ReturnType<typeof authAC>

export const authAC = (isLoggedIn: boolean) => ({
    type: "LOGIN/SET_LOGIN",
    isLoggedIn
} as const)

export const authTC = (data: LoginParamsType) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            dispatch(setAppStatusAC("failed"))
            handleServerAppError(res.data, dispatch)
        }

    }).catch((err) => {
        dispatch(setAppStatusAC("failed"))
        handleServerNetworkError(err, dispatch)
    })
}

export const logoutTC = () => (dispatch: AppThunkDispatch) => {
    authAPI.logOut().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(authAC(false))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            dispatch(setAppStatusAC("failed"))
            handleServerAppError(res.data, dispatch)
        }

    }).catch((err) => {
        dispatch(setAppStatusAC("failed"))
        handleServerNetworkError(err, dispatch)
    })
}