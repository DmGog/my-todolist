import {useTodolist} from "./todolist/hooks/useTodolist";
import {AddItemForm} from "../../components/AddItenForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";
import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootState} from "../../App/store";

export const TodolistList = () => {
    const {
        changeStatus,
        removeTask,
        changeTaskTitle,
        changeTodoTitle,
        addTask,
        myTasks,
        deleteTodolist,
        todolists,
        changeFilter,
        addTodolist
    } = useTodolist()

    const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (<>
            <AddItemForm addItem={addTodolist}/>
            <div className={"wrapper-todolist"}>
                {todolists.map((tl) => {

                    let tasksTodolist = myTasks[tl.id]
                    return <Todolist key={tl.id}
                                     todolist={tl}
                                     myTasks={tasksTodolist}
                                     changeFilter={changeFilter}
                                     removeTask={removeTask}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     deleteTodolist={deleteTodolist}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodoTitle={changeTodoTitle}
                    />
                })}
            </div>
        </>
    )
}