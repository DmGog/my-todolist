import React from "react";
import {useEditableSpan} from "./hooks/useEditableSpan";

type EditableSpanType = {
    oldTitle: string
    className?: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    const {activateEditMode, editMode, newTitle, onChangeInputHandler} = useEditableSpan(props.callBack, props.oldTitle)

    return editMode ? <input value={newTitle} onBlur={activateEditMode} onChange={onChangeInputHandler} autoFocus/> :
        <span onDoubleClick={activateEditMode} className={props.className}>{props.oldTitle}</span>
})