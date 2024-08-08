import React from "react";
import {AddItemForm} from "./AddItemForm";


export default {
    title: "AddItemForm component",
    component: AddItemForm
}

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={(title: string) => {
        alert(title)
    }}/>
}