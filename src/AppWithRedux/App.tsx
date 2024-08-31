import "./App.css";
import React from "react";
import {GlobalStyled} from "../styles/GlobalStyled";
import {LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";


function App() {
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <GlobalStyled/>
            {status === "loading" &&
                (
                    <div style={{position: "absolute", top: 0, left: 0, right: 0}}>
                        <LinearProgress/>
                    </div>
                )}
            <ErrorSnackBar/>
            <Outlet/>
        </div>
    );
}

export default App;

