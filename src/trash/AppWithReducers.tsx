import "../AppWithRedux/App.css";
import {Todolist} from "../features/Todolists/todolist/Todolist";
import React, {useReducer} from "react";
import {GlobalStyled} from "../styles/GlobalStyled";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItenForm/AddItemForm";
import {
    createTodolistAC,
    changeTodolistFilterActionAC,
    updateTodolistTitleAC, FilterType, deleteTodolistAC,
    todolistsReducer
} from "../features/Todolists/todolist/todolists-reducer";
import {
    createTaskAC,
    updateTaskAC,
    removeAllTasksAC,
    deleteTaskAC,
    tasksReducer
} from "../features/Todolists/todolist/task/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-a-p-i";


function AppWithReducers() {

    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolist1, title: "My tasks", filter: "all", addedDate: "", order: 0},
        {id: todolist2, title: "My work", filter: "all", addedDate: "", order: 0},]
    )

    let [myTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
        const action = createTodolistAC({id: v1(), title, addedDate: "", order: 0})
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoTitle(newTitle: string, todolistId: string) {
        dispatchToTodolistsReducer(updateTodolistTitleAC(todolistId, newTitle))
    }

    function changeFilter(filter: FilterType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterActionAC(todolistId, filter))
    }

    /*                      tasks                     */
    const onDeleteAllTask = (todolistId: string) => {
        dispatchToTasksReducer(removeAllTasksAC(todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        const action = createTaskAC({
            id: todolistId,
            title,
            status: TaskStatuses.Completed,
            todoListId: todolistId,
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Hi,
        })
        dispatchToTasksReducer(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = deleteTaskAC(taskId, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskAC(taskId, {status}, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = updateTaskAC(taskId, {title: newTitle}, todolistId)
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

