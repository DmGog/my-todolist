import {ChangeEvent, useState} from "react";


export const useEditableSpan = (callBack: (newTitle: string) => void,
                                oldTitle: string) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(!editMode)
        setNewTitle(oldTitle)
        callBack(newTitle)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    return {activateEditMode, onChangeInputHandler, newTitle, editMode}
}