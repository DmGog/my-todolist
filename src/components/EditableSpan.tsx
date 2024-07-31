import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    oldTitle: string
    className?: string
    callBack: (newTitle: string) => void
}

export const EditableSpan=React.memo( (props: EditableSpanType)=> {
    console.log("SPAN")
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(!editMode)
        setNewTitle(props.oldTitle)
        props.callBack(newTitle)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return editMode ? <input value={newTitle} onBlur={activateEditMode} onChange={onChangeInputHandler} autoFocus/> :
        <span onDoubleClick={activateEditMode} className={props.className}>{props.oldTitle}</span>
})