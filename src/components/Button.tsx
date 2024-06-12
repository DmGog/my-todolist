import React from "react";
import styled from "styled-components";


type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    className?: string
}
export const Button = (props: ButtonPropsType) => {
    return (
        <StyledButton className={props.className} onClick={props.onClickHandler}>{props.title}</StyledButton>
    );
};

const StyledButton = styled.button`
    border: none;
    padding: 5px;
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