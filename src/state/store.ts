import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type AppRootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export const  useAppDispatch =  () => useDispatch<AppThunkDispatch>()
// @ts-ignore
window.store = store