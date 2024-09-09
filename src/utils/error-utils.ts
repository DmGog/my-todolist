import {ResponseTaskType, ResponseType} from "../api/todolists-a-p-i";
import {AppThunkDispatch} from "../App/store";
import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";


export const handleServerAppError = <T>(data: ResponseTaskType<T>, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC({error: data.messages[0]}))
    dispatch(setAppStatusAC({status: "failed"}))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : "some error occurred"}))
    dispatch(setAppStatusAC({status: "failed"}))
}
export const handleServerAppErrorTodo = <D>(data: ResponseType<D>, dispatch: AppThunkDispatch) => {
    dispatch(setAppErrorAC({error: data.messages[0]}))
    dispatch(setAppStatusAC({status: "failed"}))
}