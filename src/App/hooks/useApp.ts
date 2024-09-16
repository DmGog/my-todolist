import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../store";
import {initializedAppTC, RequestStatusType} from "../appSlice";
import {useCallback, useEffect} from "react";
import {logoutTC} from "../../features/Login/authSlice";

export const useApp =()=>{
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    const initialized = useSelector<AppRootState>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializedAppTC())
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return {
        status,
        initialized,
        isLoggedIn,
        logoutHandler
    }
}