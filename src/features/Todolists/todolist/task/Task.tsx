import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolists-a-p-i";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

type TaskPropsType = {
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    id: string
    tasksTodolist: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const {changeStatus, removeTask, changeTaskTitle, id, tasksTodolist} = props
    const onRemoveTask = () => removeTask(tasksTodolist.id, id)
    const onChangeHandlerIsDone = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(tasksTodolist.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, id)
    }

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(tasksTodolist.id, newTitle, id)
    }, [changeTaskTitle, id, tasksTodolist])
    return (
        <li key={tasksTodolist.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Checkbox color="success"  checked={tasksTodolist.status === TaskStatuses.Completed} onChange={onChangeHandlerIsDone}/>
            <EditableSpan className={tasksTodolist.status === TaskStatuses.Completed ? "is-done" : ""}
                          oldTitle={tasksTodolist.title}
                          callBack={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveTask} aria-label="delete">
                <Delete/>
            </IconButton>
        </li>
    )
})