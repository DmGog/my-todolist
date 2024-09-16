import React from "react";
import {useAddItemForm} from "./hooks/useAddItemForm";
import Button from "@mui/material/Button";



type AddItemType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemType) => {
    const {addItem, disabled = false} = props

    const {newTitle, onChangeHandler, error, onKeyPressHandler, addItems} = useAddItemForm(addItem)

    return <div>
        <input onKeyPress={onKeyPressHandler}
               onChange={onChangeHandler}
               value={newTitle}
               className={error ? "error" : ""}
               disabled={disabled}
        />
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Button style={{minWidth: "10px", padding: "0 10px"}} variant="outlined" onClick={addItems}
                disabled={disabled}>+</Button>
        {error && <div className={"error-message"}>Field is required</div>}
    </div>
})