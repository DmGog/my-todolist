import React from "react";
import styled from "styled-components";

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
}
export const Button = (props: ButtonPropsType) => {
    return (
        <StyledButton onClick={props.onClickHandler}>{props.title}</StyledButton>
    );
};

const StyledButton = styled.button`
    border: none;
    padding: 5px;
    background-color: #c3d1d9;
    border-radius: 4px;
    border: 2px solid #c3d1d9;
    cursor: pointer;


    &:hover {
        background-color: #c0f142;
        border: 2px solid #c0f142;


    }

    &:active {
        background-color: #f5b061;
        border: 2px solid #f5b061;

    }
`