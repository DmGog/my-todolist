import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, myTasksType} from "../common/PropsType";
import {Button} from "./Button";
import styled from "styled-components";


type TodolistPropsType = {
    id: string
    title: string
    myTasks: myTasksType[]
    changeFilter: (filter: FilterType, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    onDeleteAllTask: (todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {

        id,
        title,
        myTasks,
        filter,
        changeFilter,
        removeTask,
        addTask,
        onDeleteAllTask,
        changeStatus,
        deleteTodolist,
    } = props

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    let tasksTodolist = myTasks
    if (filter === "active") {
        tasksTodolist = tasksTodolist.filter(e => !e.isDone)
    }
    if (filter === "completed") {
        tasksTodolist = tasksTodolist.filter(e => e.isDone)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask(newTaskTitle, id);
            setNewTaskTitle("")
        }
    }

    const addTasks = () => {
        if (newTaskTitle.trim() === "") {
            setError("Field is required")
        } else {
            addTask(newTaskTitle.trim(), id);
            setNewTaskTitle("")
        }
    }


    const onAllClickHandler = () => changeFilter("all", id)
    const onActiveClickHandler = () => changeFilter("active", id)
    const onCompletedClickHandler = () => changeFilter("completed", id)

    const allDeleteTasks = () => onDeleteAllTask(id)
    const deleteTodo = () => deleteTodolist(id)


    return (
        <FlexWrapper>
            <StyledTodolist>
                <Button onClickHandler={deleteTodo} title={"Delete Todolist"}/>
                <h1>{title}</h1>
                <div>
                    <input onKeyPress={onKeyPressHandler}
                           onChange={onChangeHandler}
                           value={newTaskTitle}
                           className={error ? "error" : ""}
                    />
                    <Button title={"+"} onClickHandler={addTasks}/>
                    {error && <div className={"error-message"}>Field is required</div>}
                </div>
                <StyledTask>
                    {myTasks.length === 0 ? <p>There are no tasks</p> : (
                        <ul>
                            {tasksTodolist.map((m) => {
                                const onRemoveTask = () => removeTask(m.id, id)
                                const onChangeHandlerIsDone = (e: ChangeEvent<HTMLInputElement>) => {
                                    changeStatus(m.id, e.currentTarget.checked, id)
                                }
                                return (
                                    <li key={m.id}>
                                        <input type={"checkbox"} checked={m.isDone}
                                               onChange={onChangeHandlerIsDone}

                                        />
                                        <span className={m.isDone ? "is-done" : ""}>{m.title}</span>
                                        <Button title={"X"} onClickHandler={onRemoveTask}/>

                                    </li>
                                )
                            })}
                        </ul>
                    )}

                </StyledTask>
                <ButtonWrapper>
                    <Button className={filter === "all" ? "active-filter" : ""}
                            title={"ALL"}
                            onClickHandler={onAllClickHandler}/>
                    <Button className={filter === "active" ? "active-filter" : ""} title={"ACTIVE"}
                            onClickHandler={onActiveClickHandler}/>
                    <Button className={filter === "completed" ? "active-filter" : ""} title={"COMPLETED"}
                            onClickHandler={onCompletedClickHandler}/>
                </ButtonWrapper>
                <Button title={"delete all task"} onClickHandler={allDeleteTasks}/>
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
    padding: 20px;

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
