import React, {ChangeEvent} from "react";
import {FilterType, myTasksType} from "../common/PropsType";
import {Button} from "./Button";
import styled from "styled-components";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodoTitle: (newTitle: string, todolistId: string) => void
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
        changeTaskTitle,
        changeTodoTitle
    } = props

    let tasksTodolist = myTasks
    if (filter === "active") {
        tasksTodolist = tasksTodolist.filter(e => !e.isDone)
    }
    if (filter === "completed") {
        tasksTodolist = tasksTodolist.filter(e => e.isDone)
    }

    const onAllClickHandler = () => changeFilter("all", id)
    const onActiveClickHandler = () => changeFilter("active", id)
    const onCompletedClickHandler = () => changeFilter("completed", id)

    const allDeleteTasks = () => onDeleteAllTask(id)
    const deleteTodo = () => deleteTodolist(id)

    const addItemTask = (title: string) => {
        addTask(title, id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        changeTodoTitle(newTitle, id)
    }

    return (
        <FlexWrapper>
            <StyledTodolist>
                <Button onClickHandler={deleteTodo} title={"Delete Todolist"}/>
                <h1><EditableSpan oldTitle={title} callBack={changeTodolistTitle}/></h1>
                <AddItemForm addItem={addItemTask}/>
                <StyledTask>
                    {myTasks.length === 0 ? <p>There are no tasks</p> : (
                        <ul>
                            {tasksTodolist.map((m) => {
                                const onRemoveTask = () => removeTask(m.id, id)
                                const onChangeHandlerIsDone = (e: ChangeEvent<HTMLInputElement>) => {
                                    changeStatus(m.id, e.currentTarget.checked, id)
                                }

                                const onChangeTitleHandler = (newTitle: string) => {
                                    changeTaskTitle(m.id, newTitle, id)
                                }
                                return (
                                    <li key={m.id}>
                                        <input type={"checkbox"} checked={m.isDone}
                                               onChange={onChangeHandlerIsDone}

                                        />
                                        <EditableSpan className={m.isDone ? "is-done" : ""} oldTitle={m.title}
                                                      callBack={onChangeTitleHandler}/>
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
