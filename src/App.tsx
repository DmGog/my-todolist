import "./App.css";
import {Todolist} from "./components/Todolist";
import {FilterType, TaskStateType, TodolistType} from "./common/PropsType";
import React, {useState} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";


function App() {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist1, title: "My tasks", filter: "all"},
        {id: todolist2, title: "My work", filter: "all"},]
    )

    let [myTasks, setMyTasks] = useState<TaskStateType>({
        [todolist1]: [
            {id: v1(), title: "Урок в понедельник: React", isDone: true,},
        ],
        [todolist2]: [
            {id: v1(), title: "Учиться", isDone: true,},
        ],

    })

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(e => e.id !== todolistId))
        //     // удалим и таски из памяти
        delete myTasks[todolistId]
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title, filter: "all"}
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
        let task = {id: v1(), title: title, isDone: false}
        setMyTasks({...myTasks, [todolistId]: myTasks[todolistId] = [task, ...myTasks[todolistId]]})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setMyTasks({...myTasks, [todolistId]: myTasks[todolistId].filter(e => e.id !== taskId)})
    }

    function changeFilteredTask(filter: FilterType, todolistId: string) {
        setTodolists(todolists.map(e => e.id === todolistId ? {...e, filter} : e))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = myTasks[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = !task.isDone

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
                                 id={tl.id}
                                 title={tl.title}
                                 myTasks={tasksTodolist}
                                 changeFilter={changeFilteredTask}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 onDeleteAllTask={onDeleteAllTask}
                                 changeStatus={changeStatus}
                                 filter={tl.filter}
                                 deleteTodolist={deleteTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodoTitle={changeTodoTitle}
                />
            })}
        </div>
    );
}

export default App;

