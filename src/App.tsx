import "./App.css";
import {Todolist} from "./components/Todolist";
import {FilterType, myTasksType} from "./common/PropsType";
import {useState} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";


function App() {

    const [myTasks, setMyTasks] = useState<Array<myTasksType>>([
        {
            id: 1,
            title: "Урок в понедельник: React",
            isDone: true,
        },
        {
            id: 2,
            title: "Практика во вторник",
            isDone: true,
        },
        {
            id: 3,
            title: "Урок среда: JS",
            isDone: true,
        },
        {
            id: 4,
            title: "Практика в четверг",
            isDone: true,
        }
        ,
        {
            id: 5,
            title: "Практика в пятницу",
            isDone: true,
        },
        {
            id: 6,
            title: "Практика в субботу",
            isDone: true,
        }
        ,
        {
            id: 7,
            title: "Практика в воскресенье",
            isDone: false,
        }
    ])


    const removeTask = (taskId: number) => {
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
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;

