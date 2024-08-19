import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppThunkDispatch} from "../../state/store";
import {useCallback, useEffect} from "react";
import {
    addTodolistAC,
    changeTodolistFilterActionAC,
    changeTodolistTitleAC, fetchTodosThunk, FilterType,
    removeTodolistAC, TodolistDomainType
} from "../../state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    removeTaskAC, TaskStateType
} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-a-p-i";


export const useAppWithredux = () => {
    const dispatch = useDispatch<AppThunkDispatch>()
    const todolists = useSelector<AppRootState, TodolistDomainType[]>((state) => state.todolists)
    const myTasks = useSelector<AppRootState, TaskStateType>((state) => state.tasks)


    useEffect(() => {
        /*  fetchTodosThunk(dispatch)*/
        dispatch(fetchTodosThunk)
    }, []);


    const deleteTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterActionAC(todolistId, filter))
    }, [dispatch])

    /*                      tasks                     */
    const onDeleteAllTask = useCallback((todolistId: string) => {
        dispatch(removeAllTasksAC(todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, status, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    return {
        todolists,
        myTasks,
        deleteTodolist,
        addTodolist,
        changeTodoTitle,
        changeFilter,
        onDeleteAllTask,
        addTask,
        removeTask,
        changeStatus,
        changeTaskTitle
    }
}