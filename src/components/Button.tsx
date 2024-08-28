import React from "react";
import styled from "styled-components";


type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    className?: string
    disabled?: boolean

}
export const Button = (props: ButtonPropsType) => {
    return (
        <StyledButton disabled={props.disabled} className={props.className}
                      onClick={props.onClickHandler}>{props.title}</StyledButton>
    );
};

const StyledButton = styled.button`
    padding: 5px;
    border-radius: 4px;
    border: 2px solid #c3d1d9;
    cursor: pointer;
    background-color: ${props => props.className ? "active-filter" : "#d1ec93"};


    &:hover {
        background-color: #eba7f5;
        border: 2px solid #c0f142;


    }

    &:active {
        background-color: #f5b061;
        border: 2px solid #f5b061;

    }

    &:disabled {
        background-color: gray;
        border: 2px solid gray;
        color: white;
        cursor: auto;
    }
`