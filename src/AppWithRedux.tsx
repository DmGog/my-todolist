import "./App.css";
import {Todolist} from "./components/Todolist";
import {FilterType, TaskStateType, TodolistType} from "./common/PropsType";
import React, {useCallback} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterActionAC,
    changeTodolistTitleAC, removeTodolistAC,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    removeTaskAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>((state) => state.todolists)
    const myTasks = useSelector<AppRootState, TaskStateType>((state) => state.tasks)

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

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <GlobalStyled/>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {

                let tasksTodolist = myTasks[tl.id]
                return <Todolist key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 myTasks={tasksTodolist}
                                 changeFilter={changeFilter}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 onDeleteAllTask={onDeleteAllTask}
                                 changeStatus={changeStatus}
                                 filter={tl.filter}
                                 deleteTodolist={deleteTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodoTitle={changeTodoTitle}
                />
            })}
        </div>
    );
}

export default AppWithRedux;

