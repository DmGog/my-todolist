import {createTodolistAC, getTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolistsSlice";
import {tasksReducer, TaskStateType} from "./task/tasksSlice";

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = createTodolistAC({todolist: {id: "4", title: "new todolist", order: 0, addedDate: ""}})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})

test("empty arrays should be added when we set todolists", () => {
    const action = getTodolistsAC({
        todolists: [
            {id: "1", title: "What to learn", addedDate: "", order: 0},
            {id: "2", title: "What to buy", addedDate: "", order: 0},
        ]
    })

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState["1"]).toBeDefined()
    expect(endState["2"]).toBeDefined()

})