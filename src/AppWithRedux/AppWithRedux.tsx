import "./App.css";
import {Todolist} from "../features/Todolists/todolist/Todolist";
import React from "react";
import {GlobalStyled} from "../styles/GlobalStyled";
import {AddItemForm} from "../components/AddItenForm/AddItemForm";
import {useAppWithredux} from "./hooks/useAppWithredux";


function AppWithRedux() {
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

