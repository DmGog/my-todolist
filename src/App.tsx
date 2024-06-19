import "./App.css";
import {Todolist} from "./components/Todolist";
import {FilterType, TodolistType} from "./common/PropsType";
import React, {useState} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";
import {v1} from "uuid";


function App() {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist1, title: "My tasks", filter: "all"},
        {id: todolist2, title: "My work", filter: "all"},]
    )

    let [myTasks, setMyTasks] = useState({
        [todolist1]: [
            {id: v1(), title: "Урок в понедельник: React", isDone: true,},
            {id: v1(), title: "Практика во вторник", isDone: true,},
            {id: v1(), title: "Урок среда: JS", isDone: true,},
            {id: v1(), title: "Практика в четверг", isDone: true,},
            {id: v1(), title: "Практика в пятницу", isDone: true,},
            {id: v1(), title: "Практика в субботу", isDone: true,},
            {id: v1(), title: "Практика в воскресенье", isDone: false,}
        ],
        [todolist2]: [
            {id: v1(), title: "Учиться", isDone: true,},
            {id: v1(), title: "Учиться", isDone: true,},
        ],

    })

    const deleteTodolist = (todolistId: string) => {
        //     let deleteTodolist = todolists.filter(e => e.id !== todolistId)
        // //     todolists = deleteTodolist
        setTodolists(todolists.filter(e => e.id !== todolistId))
        //     // удалим и таски из памяти
        delete myTasks[todolistId]
        //     setMyTasks({...myTasks})
    }

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
        // let todolist = todolists.find(t => t.id === todolistId)
        // if (todolist) {
        //     todolist.filter = filter
        //     setTodolists([...todolists])
        // }
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


    return (
        <div className="App">
            <GlobalStyled/>
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
                />
            })}

        </div>
    );
}

export default App;

