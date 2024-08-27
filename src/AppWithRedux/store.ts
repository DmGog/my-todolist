import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/todolist/task/tasks-reducer";
import {todolistsReducer} from "../features/Todolists/todolist/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type AppRootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export const  useAppDispatch =  () => useDispatch<AppThunkDispatch>()
// @ts-ignore
window.store = store