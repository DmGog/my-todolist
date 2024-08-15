import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button} from "./Button";
import {TaskStatuses, TaskType} from "../api/todolists-a-p-i";

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
        <li key={tasksTodolist.id}>
            <input type={"checkbox"} checked={tasksTodolist.status === TaskStatuses.Completed}
                   onChange={onChangeHandlerIsDone}

            />
            <EditableSpan className={tasksTodolist.status === TaskStatuses.Completed ? "is-done" : ""}
                          oldTitle={tasksTodolist.title}
                          callBack={onChangeTitleHandler}/>
            <Button title={"X"} onClickHandler={onRemoveTask}/>

        </li>
    )
})