import "./App.css";
import {Todolist} from "../features/Todolists/todolist/Todolist";
import React from "react";
import {GlobalStyled} from "../styles/GlobalStyled";
import {AddItemForm} from "../components/AddItenForm/AddItemForm";
import {useAppWithredux} from "./hooks/useAppWithredux";
import {LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";


function App() {
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

    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <GlobalStyled/>
            {status === "loading" && (
                <div style={{position: "absolute", top: 0, left: 0, right: 0}}>
                    <LinearProgress/>
                </div>
            )}
            <ErrorSnackBar/>
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
        </div>
    );
}

export default App;

