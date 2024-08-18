import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootState = ReturnType<typeof rootReducer>


// export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>
//
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// @ts-ignore
window.store = store