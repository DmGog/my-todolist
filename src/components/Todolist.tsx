import React from "react";
import {FilterType, myTasksType} from "../common/PropsType";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    myTasks: myTasksType[]
    changeFilter: (filter: FilterType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, myTasks, changeFilter} = props
    return (
        <div>
            <h1>{title}</h1>
            <ul>
                {myTasks.map((m) => {
                    return (
                        <li key={m.id}><input type={"checkbox"} checked={m.isDone}/> <span>{m.title}</span><button>x</button></li>
                    )
                })}
            </ul>
            <Button title={"ALL"} onClickHandler={() => changeFilter("all")}/>
            <Button title={"ACTIVE"} onClickHandler={() => changeFilter("active")}/>
            <Button title={"COMPLETED"} onClickHandler={() => changeFilter("completed")}/>
        </div>
    );
};

