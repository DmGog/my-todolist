import "../AppWithRedux/App.css";
import React, {useState} from "react";
import {v1} from "uuid";
import {FilterType, TodolistDomainType} from "../features/Todolists/todolist/todolists-reducer";
import {TaskStateType} from "../features/Todolists/todolist/task/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-a-p-i";
import {GlobalStyled} from "../styles/GlobalStyled";
import {AddItemForm} from "../components/AddItenForm/AddItemForm";
import {Todolist} from "../features/Todolists/todolist/Todolist";


function App() {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, setTodolists] = useState<TodolistDomainType[]>([
        {id: todolist1, title: "My tasks", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolist2, title: "My work", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},]
    )

    let [myTasks, setMyTasks] = useState<TaskStateType>({
        [todolist1]: [
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.Completed,
                todoListId: todolist1,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Hi,
            }
        ],
        [todolist2]: [
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolist2,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Hi,

            }
        ],
    })

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(e => e.id !== todolistId))
        //     // удалим и таски из памяти
        delete myTasks[todolistId]
    }

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            title,
            filter: "all",
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        }
        setTodolists([todolist, ...todolists])
        setMyTasks({...myTasks, [todolist.id]: []})
    }

    function changeTodoTitle(newTitle: string, todolistId: string) {
        setTodolists(todolists.map(e => e.id === todolistId ? {...e, title: newTitle} : e))
    }

    /*                      tasks                     */
    const onDeleteAllTask = (todolistId: string) => {
        setMyTasks({...myTasks, [todolistId]: myTasks[todolistId] = []})
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistId,
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Hi,
        }
        setMyTasks({...myTasks, [todolistId]: myTasks[todolistId] = [task, ...myTasks[todolistId]]})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setMyTasks({...myTasks, [todolistId]: myTasks[todolistId].filter(e => e.id !== taskId)})
    }

    function changeFilteredTask(filter: FilterType, todolistId: string) {
        setTodolists(todolists.map(e => e.id === todolistId ? {...e, filter} : e))
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        let tasks = myTasks[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.status = status

            setMyTasks({...myTasks})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        setMyTasks({
            ...myTasks,
            [todolistId]: myTasks[todolistId].map(e => e.id === taskId ? {...e, title: newTitle} : e)
        })
    }


    return (
        <div className="App">
            <GlobalStyled/>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {

                let tasksTodolist = myTasks[tl.id]
                return <Todolist key={tl.id}
                                 todolist={tl}
                                 myTasks={tasksTodolist}
                                 changeFilter={changeFilteredTask}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 onDeleteAllTask={onDeleteAllTask}
                                 changeStatus={changeStatus}
                                 deleteTodolist={deleteTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodoTitle={changeTodoTitle}
                />
            })}
        </div>
    );
}

export default App;

