import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../state/store";
import {useCallback, useEffect} from "react";
import {
    changeTodolistFilterActionAC,
    getTodosTC,
    FilterType,
    TodolistDomainType,
    deleteTodoTC,
    createTodoTC,
    updateTodoTitleTC
} from "../../state/todolists-reducer";
import {
    createTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    deleteTaskTC, TaskStateType
} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-a-p-i";


export const useAppWithredux = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootState, TodolistDomainType[]>((state) => state.todolists)
    const myTasks = useSelector<AppRootState, TaskStateType>((state) => state.tasks)


    useEffect(() => {
        dispatch(getTodosTC())
    }, []);


    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodoTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])

    const changeTodoTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(updateTodoTitleTC(todolistId, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterActionAC(todolistId, filter))
    }, [dispatch])

    /*                      tasks                     */
    const onDeleteAllTask = useCallback((todolistId: string) => {
        dispatch(removeAllTasksAC(todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
            const thunk = deleteTaskTC(todolistId, taskId)
            dispatch(thunk)
        }, [dispatch]
    )

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