import "../App.css";
import {Todolist} from "../components/Todolist";
import {FilterType, TaskStateType, TodolistType} from "../common/PropsType";
import React, {useCallback} from "react";
import {GlobalStyled} from "../styles/GlobalStyled";
import {AddItemForm} from "../components/AddItenForm/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterActionAC,
    changeTodolistTitleAC, removeTodolistAC,
} from "../state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    removeTaskAC,
} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
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

