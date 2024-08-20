import React, {useCallback, useEffect} from "react";
import {Button} from "./Button";
import styled from "styled-components";
import {AddItemForm} from "./AddItenForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Task} from "./Task";
import {FilterType} from "../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-a-p-i";
import {useAppDispatch} from "../state/store";
import {getTasksTC} from "../state/tasks-reducer";


type TodolistPropsType = {
    id: string
    title: string
    myTasks: TaskType[]
    changeFilter: (filter: FilterType, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    onDeleteAllTask: (todolistId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterType
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodoTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
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

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, []);



    let tasksTodolist = myTasks
    if (filter === "active") {
        tasksTodolist = tasksTodolist.filter(e => e.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksTodolist = tasksTodolist.filter(e => e.status === TaskStatuses.Completed)
    }

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id])

    const allDeleteTasks = () => onDeleteAllTask(id)
    const deleteTodo = () => deleteTodolist(id)

    const addItemTask = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodoTitle(newTitle, id)
    }, [changeTodoTitle, id])

    return (
        <FlexWrapper>
            <StyledTodolist>
                <Button onClickHandler={deleteTodo} title={"Delete Todolist"}/>
                <h1><EditableSpan oldTitle={title} callBack={changeTodolistTitle}/></h1>
                <AddItemForm addItem={addItemTask}/>
                <StyledTask>
                    {myTasks.length === 0 ? <p>There are no tasks</p> : (
                        <ul>
                            {tasksTodolist.map(m => <Task key={m.id} changeStatus={changeStatus} removeTask={removeTask}
                                                          changeTaskTitle={changeTaskTitle} id={id} tasksTodolist={m}/>
                            )}
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
});

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
