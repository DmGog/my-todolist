import React from "react";
import {Button} from "../Button";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemType) => {
    const {addItem} = props

    const {newTitle, onChangeHandler, error, onKeyPressHandler, addItems} = useAddItemForm(addItem)

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