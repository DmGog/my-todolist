import {useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {
    changeTodolistFilterAC,
    createTodoTC,
    deleteTodoTC,
    FilterType,
    getTodosTC,
    TodolistDomainType,
    updateTodoTitleTC
} from "../todolistsSlice";
import {createTaskTC, removeTask, TaskStateType, updateTaskTC} from "../task/tasksSlice";
import {TaskStatuses} from "../../../../api/todolists-a-p-i";
import {AppRootState, useAppDispatch} from "../../../../App/store";


export const useTodolist = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootState, TodolistDomainType[]>((state) => state.todolists)
    const myTasks = useSelector<AppRootState, TaskStateType>((state) => state.tasks)


    useEffect(() => {
        dispatch(getTodosTC())
    }, []);


    const deleteTodo = useCallback((todolistId: string) => {
        dispatch(deleteTodoTC(todolistId))
    }, [dispatch])

    const createTodo = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])

    const updateTodoTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(updateTodoTitleTC(todolistId, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }, [dispatch])

    /*                      tasks                     */

    const createTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const deleteTask = useCallback((taskId: string, todolistId: string) => {
            dispatch(removeTask({taskId, todolistId}))
        }, [dispatch]
    )

    const updateTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const updateTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: newTitle}))
    }, [dispatch])

    return {
        todolists,
        myTasks,
        deleteTodolist: deleteTodo,
        addTodolist: createTodo,
        changeTodoTitle: updateTodoTitle,
        changeFilter,
        addTask: createTask,
        removeTask: deleteTask,
        changeStatus: updateTaskStatus,
        changeTaskTitle: updateTaskTitle
    }
}