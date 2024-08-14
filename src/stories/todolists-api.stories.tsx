import React, {useEffect, useState} from "react"
import {todolistsAPI} from "../api/todolists-a-p-i";

export default {
    title: "API",
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")
    // useEffect(() => {
    //     todolistsAPI.createTodolist("YO-YO")
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const onclickCreateHandler = () => {
        if (title.trim() !== "") {
            todolistsAPI.createTodolist(title)
                .then((res) => {
                    setState(res.data)
                })
            setTitle("")
        }
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={title} placeholder={"title"} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={onclickCreateHandler}>+</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [stateId, setStateId] = useState<string[]>([])
    const [todolistId, setTodolistId] = useState("")
    // useEffect(() => {
    //     todolistsAPI.deleteTodolist("e47ccf7d-dc62-42f7-ab0b-c4efa42463fd")
    //         .then((res) => {
    //             setState(res.data)
    //         })
    //
    // }, [])
    const onClickDeleteHandler = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
        setTodolistId("")
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickDeleteHandler}>x</button>
        </div>
        <div>
            <button onClick={() => {
                todolistsAPI.getTodolists()
                    .then((res) => {
                        setStateId(res.data.map(e => e.id))
                    })
            }}>получить список ID
            </button>
            <br/>
            список todolistId:<br/>
            {JSON.stringify(stateId)}
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [newTitle, setNewTitle] = useState("")
    const [todolistId, setTodolistId] = useState("")
    // useEffect(() => {
    //     todolistsAPI.updateTodolist("2f379b0d-e336-4dc4-aa55-47a477505f33", "Hello world")
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const onclickUpdateHandler = () => {
        if (newTitle.trim() !== "") {
            todolistsAPI.updateTodolist(todolistId, newTitle)
                .then((res) => {
                    setState(res.data)
                })
            setNewTitle("")
            setTodolistId("")
        }
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input value={todolistId} placeholder={"todolistId"} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input value={newTitle} placeholder={"new title"} onChange={(e) => {
                setNewTitle(e.currentTarget.value)
            }}/>
            <button onClick={onclickUpdateHandler}>+</button>
        </div>
    </div>
}

//---------------------TASKS
export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolistTasks("8df85bf1-cc63-4342-be6c-a0d9f7262ea7")
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolistTask("8df85bf1-cc63-4342-be6c-a0d9f7262ea7", "React")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTodolistTask("8df85bf1-cc63-4342-be6c-a0d9f7262ea7", "c4a58fe9-c824-4366-871b-a0ae102eb20f")
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolistTask("8df85bf1-cc63-4342-be6c-a0d9f7262ea7", "867da5db-4ba8-48f3-bc09-a10b8a97d266", "TYPESCRIPT")
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}