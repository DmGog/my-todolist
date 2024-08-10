import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (onItemAdded: (title: string) => void) => {
    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const addItems = () => {
        if (newTitle.trim() === "") {
            setError("Field is required")
        } else {
            onItemAdded(newTitle.trim());
            setNewTitle("")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter" && newTitle.trim() !== "") {
            onItemAdded(newTitle);
            setNewTitle("")
        }
        if (newTitle.trim() === "") {
            setError("Field is required")
        }
    }

    return {newTitle, onChangeHandler, onKeyPressHandler, error, addItems}

}