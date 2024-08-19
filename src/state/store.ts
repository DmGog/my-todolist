import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type AppRootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

// @ts-ignore
window.store = store