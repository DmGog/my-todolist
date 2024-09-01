import "./App.css";
import React from "react";
import {GlobalStyled} from "../styles/GlobalStyled";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {TodolistList} from "../features/Todolists/TodolistList";
import Button from "@mui/material/Button";
import {useApp} from "./hooks/useApp";


function App() {
    const {status, initialized, isLoggedIn, logoutHandler} = useApp()

    if (!initialized) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <CircularProgress/></div>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <GlobalStyled/>
                <>
                    {isLoggedIn && (<Button onClick={logoutHandler}>Log out</Button>)}</>
                {status === "loading" &&
                    (
                        <div style={{position: "absolute", top: 0, left: 0, right: 0}}>
                            <LinearProgress/>
                        </div>
                    )}
                <ErrorSnackBar/>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/"} element={<TodolistList/>}/>
                    <Route path={"/todolist"} element={<TodolistList/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

