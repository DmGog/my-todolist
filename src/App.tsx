import "./App.css";
import {Todolist} from "./components/Todolist";
import {FilterType, myTasksType} from "./common/PropsType";
import {useState} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";
import {v1} from "uuid";


function App() {

    let [myTasks, setMyTasks] = useState<Array<myTasksType>>([
        {id: v1(), title: "Урок в понедельник: React", isDone: true,},
        {id: v1(), title: "Практика во вторник", isDone: true,},
        {id: v1(), title: "Урок среда: JS", isDone: true,},
        {id: v1(), title: "Практика в четверг", isDone: true,},
        {id: v1(), title: "Практика в пятницу", isDone: true,},
        {id: v1(), title: "Практика в субботу", isDone: true,},
        {id: v1(), title: "Практика в воскресенье", isDone: false,}
    ])

    console.log(myTasks)
    const onDeleteAllTask = () => {
        myTasks = []
        setMyTasks(myTasks)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setMyTasks([newTask, ...myTasks])
    }

    const removeTask = (taskId: string) => {
        const filerRemoveTasks = myTasks.filter(e => {
            return e.id !== taskId
        })
        setMyTasks(filerRemoveTasks)
    }

    const [filter, setFilter] = useState<FilterType>("all")

    let tasksTodolist = myTasks
    if (filter === "active") {
        tasksTodolist = myTasks.filter(e => e.isDone === false)
    }
    if (filter === "completed") {
        tasksTodolist = myTasks.filter(e => e.isDone === true)
    }

    function changeFilteredTask(filter: FilterType) {
        setFilter(filter)
    }

    return (
        <div>
            <GlobalStyled/>
            <Todolist title={"My tasks"} myTasks={tasksTodolist} changeFilter={changeFilteredTask}
                      removeTask={removeTask} addTask={addTask} onDeleteAllTask={onDeleteAllTask}/>
        </div>
    );
}

export default App;

