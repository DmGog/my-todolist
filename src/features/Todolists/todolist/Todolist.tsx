import React, {useCallback, useEffect} from "react";
import {Button} from "../../../components/Button";
import styled from "styled-components";
import {AddItemForm} from "../../../components/AddItenForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./task/Task";
import {FilterType, TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-a-p-i";
import {getTasksTC} from "./task/tasks-reducer";
import {useAppDispatch} from "../../../App/store";


type TodolistPropsType = {
    todolist: TodolistDomainType
    myTasks: TaskType[]
    changeFilter: (filter: FilterType, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    onDeleteAllTask: (todolistId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodoTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const {
        todolist,
        myTasks,
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
        dispatch(getTasksTC(todolist.id))
    }, []);


    let tasksTodolist = myTasks
    if (todolist.filter === "active") {
        tasksTodolist = tasksTodolist.filter(e => e.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksTodolist = tasksTodolist.filter(e => e.status === TaskStatuses.Completed)
    }

    const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", todolist.id), [changeFilter, todolist.id])

    const allDeleteTasks = () => onDeleteAllTask(todolist.id)
    const deleteTodo = () => deleteTodolist(todolist.id)

    const addItemTask = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodoTitle(newTitle, todolist.id)
    }, [changeTodoTitle, todolist.id])

    return (
        <FlexWrapper>
            <StyledTodolist>
                <Button onClickHandler={deleteTodo} title={"Delete Todolist"}
                        disabled={todolist.entityStatus === "loading"}/>
                <h1><EditableSpan oldTitle={todolist.title} callBack={changeTodolistTitle}/></h1>
                <AddItemForm addItem={addItemTask} disabled={todolist.entityStatus === "loading"}/>
                <StyledTask>
                    {myTasks.length === 0 ? <p>There are no tasks</p> : (
                        <ul>
                            {tasksTodolist.map(m => <Task key={m.id} changeStatus={changeStatus} removeTask={removeTask}
                                                          changeTaskTitle={changeTaskTitle} id={todolist.id}
                                                          tasksTodolist={m}/>
                            )}
                        </ul>
                    )}

                </StyledTask>
                <ButtonWrapper>
                    <Button className={todolist.filter === "all" ? "active-filter" : ""}
                            title={"ALL"}
                            onClickHandler={onAllClickHandler}/>
                    <Button className={todolist.filter === "active" ? "active-filter" : ""} title={"ACTIVE"}
                            onClickHandler={onActiveClickHandler}/>
                    <Button className={todolist.filter === "completed" ? "active-filter" : ""} title={"COMPLETED"}
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
