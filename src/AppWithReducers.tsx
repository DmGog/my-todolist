import "./App.css";
import {Todolist} from "./components/Todolist";
import React, {useReducer} from "react";
import {GlobalStyled} from "./styles/GlobalStyled";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItenForm/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterActionAC,
    changeTodolistTitleAC, FilterType, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-a-p-i";


function AppWithReducers() {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolist1, title: "My tasks", filter: "all", addedDate: "", order: 0},
        {id: todolist2, title: "My work", filter: "all", addedDate: "", order: 0},]
    )

    let [myTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolist1]: [
            {id: v1(),
        title: "React",
        status: TaskStatuses.Completed,
        todoListId: todolist1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Hi,}
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
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoTitle(newTitle: string, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle))
    }

    function changeFilter(filter: FilterType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterActionAC(todolistId, filter))
    }

    /*                      tasks                     */
    const onDeleteAllTask = (todolistId: string) => {
        dispatchToTasksReducer(removeAllTasksAC(todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(taskId, status, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
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
                                 changeFilter={changeFilter}
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

export default AppWithReducers;

