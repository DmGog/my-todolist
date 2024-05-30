import React from "react";
import {FilterType, myTasksType} from "../common/PropsType";
import {Button} from "./Button";
import styled from "styled-components";


type TodolistPropsType = {
    title: string
    myTasks: myTasksType[]
    changeFilter: (filter: FilterType) => void
    removeTask: (taskId: number) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, myTasks, changeFilter, removeTask} = props
    return (
        <FlexWrapper>
            <StyledTodolist>
                <h1>{title}</h1>
                <StyledTask>
                    {myTasks.length === 0 ? <p>There are no tasks</p> : (
                        <ul>
                            {myTasks.map((m) => {
                                return (
                                    <li key={m.id}><input type={"checkbox"} checked={m.isDone}/> <span>{m.title}</span>
                                        <Button title={"X"} onClickHandler={() => removeTask(m.id)}/>
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                </StyledTask>
                <ButtonWrapper>
                    <Button title={"ALL"} onClickHandler={() => changeFilter("all")}/>
                    <Button title={"ACTIVE"} onClickHandler={() => changeFilter("active")}/>
                    <Button title={"COMPLETED"} onClickHandler={() => changeFilter("completed")}/>
                </ButtonWrapper>
            </StyledTodolist>
        </FlexWrapper>
    );
};

const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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