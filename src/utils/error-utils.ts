import {setAppErrorAC, setAppStatusAC} from "../AppWithRedux/app-reducer";
import {ResponseTaskType} from "../api/todolists-a-p-i";
import {AppThunkDispatch} from "../AppWithRedux/store";

export const handleServerAppError = <T>(data: ResponseTaskType<T>, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC(data.messages[0]))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : "some error occurred"))
    dispatch(setAppErrorAC("failed"))


}