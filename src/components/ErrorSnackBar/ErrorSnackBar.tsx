import * as React from "react";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../App/store";
import {setAppErrorAC} from "../../App/app-reducer";


export const ErrorSnackBar = () => {

    const error = useSelector<AppRootState, string | null>(state => state.app.error)
    const isOpen = error !== null
    const dispatch = useDispatch()
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: "100%"}}
            >
                {error}
            </Alert>
        </Snackbar>
    );
}
