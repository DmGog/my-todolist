import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, myTasksType} from "../common/PropsType";
import {Button} from "./Button";
import styled from "styled-components";


type TodolistPropsType = {
    title: string
    myTasks: myTasksType[]
    changeFilter: (filter: FilterType) => void
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    onDeleteAllTask: () => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, myTasks, changeFilter, removeTask, addTask, onDeleteAllTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTasks = () => {
        if (newTaskTitle === "") {
            alert("введите название задачи")
        } else {
            addTask(newTaskTitle.trim());
            setNewTaskTitle("")
        }
    }


    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")

    return (
        <FlexWrapper>
            <StyledTodolist>
                <h1>{title}</h1>
                <div>
                    <input onKeyPress={onKeyPressHandler} onChange={onChangeHandler} value={newTaskTitle}/> <Button
                    title={"+"} onClickHandler={addTasks}/></div>
                <StyledTask>
                    {myTasks.length === 0 ? <p>There are no tasks</p> : (
                        <ul>
                            {myTasks.map((m) => {
                                const onRemoveTask = () => removeTask(m.id)

                                return (
                                    <li key={m.id}><input type={"checkbox"} checked={m.isDone}/> <span>{m.title}</span>
                                        <Button title={"X"} onClickHandler={onRemoveTask}/>
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                </StyledTask>
                <ButtonWrapper>
                    <Button title={"ALL"} onClickHandler={onAllClickHandler}/>
                    <Button title={"ACTIVE"} onClickHandler={onActiveClickHandler}/>
                    <Button title={"COMPLETED"} onClickHandler={onCompletedClickHandler}/>
                </ButtonWrapper>
                <Button title={"delete all task"} onClickHandler={onDeleteAllTask}/>
            </StyledTodolist>
        </FlexWrapper>
    );
};

const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


const StyledTodolist = styled.div`
    max-width: 300px;
    width: 100%;
    border: 2px solid green;
    border-radius: 10px;
    box-shadow: 5px 5px #bbb5b5;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    h1 {
        color: green;
    }

    p {
        color: green;
        font-size: 26px;
    }

    ul {
        list-style: none;
    }

    li {
        margin: 5px 0;
    }

    span {
        margin: 0 10px;
    }
`

const StyledTask = styled.div`
    margin: 20px 0;
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`