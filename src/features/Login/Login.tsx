import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {authTC} from "./authSlice";
import {Navigate} from "react-router-dom";
import {AppRootState, useAppDispatch} from "../../App/store";


type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {email: "email required"}
            }
            if (!values.password) {
                return {password: "password required"}
            }
        },
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const res = await dispatch(authTC(values))
            if (authTC.rejected.match(res)) {
                if (res.payload?.fieldsErrors?.length) {
                    const error = res.payload.fieldsErrors[0]
                    //@ts-ignore
                    formikHelpers.setFieldError(error.field, error.error)
                } else {
                }
            }
        },
    });

    if (isLoggedIn) {
        return <Navigate to={"/todolist"}/>
    }
    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")}/>
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password" label="Password"
                                       margin="normal" {...formik.getFieldProps("password")}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={"Remember me"} control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}/>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )

}