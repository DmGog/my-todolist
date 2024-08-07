import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type AddItemType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemType) => {
    const {addItem} = props

    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const addItems = () => {
        if (newTitle.trim() === "") {
            setError("Field is required")
        } else {
            addItem(newTitle.trim());
            setNewTitle("")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter" && newTitle.trim()!=="") {
            addItem(newTitle);
            setNewTitle("")
        }
        if(newTitle.trim() === ""){
            setError("Field is required")
        }
    }

    return <div>
        <input onKeyPress={onKeyPressHandler}
               onChange={onChangeHandler}
               value={newTitle}
               className={error ? "error" : ""}
        />
        <Button title={"+"} onClickHandler={addItems}/>
        {error && <div className={"error-message"}>Field is required</div>}
    </div>
})