import "./App.css";
import {Todolist} from "./components/Todolist";
import {FilterType, TaskStateType, TodolistType} from "./common/PropsType";
import React, {useReducer, useState} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterActionAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";


function AppWithReducers() {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolist1, title: "My tasks", filter: "all"},
        {id: todolist2, title: "My work", filter: "all"},]
    )

    let [myTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolist1]: [
            {id: v1(), title: "Урок в понедельник: React", isDone: true,},
        ],
        [todolist2]: [
            {id: v1(), title: "Учиться", isDone: true,},
        ],

    })

    const deleteTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoTitle(newTitle: string, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle))
    }

    function changeFilter(filter: FilterType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterActionAC(todolistId, filter))
    }

    /*                      tasks                     */
    const onDeleteAllTask = (todolistId: string) => {
        dispatchToTasksReducer(removeAllTasksAC(todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }


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

export default AppWithReducers;

