import {useAppWithredux} from "../../AppWithRedux/hooks/useAppWithredux";
import {AddItemForm} from "../../components/AddItenForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";
import React from "react";

export const TodolistList = () => {
    const {
        changeStatus,
        removeTask,
        changeTaskTitle,
        changeTodoTitle,
        addTask,
        myTasks,
        onDeleteAllTask,
        deleteTodolist,
        todolists,
        changeFilter,
        addTodolist
    } = useAppWithredux()

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
                                     onDeleteAllTask={onDeleteAllTask}
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