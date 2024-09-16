import {
    createTodolistAC,
    changeTodolistFilterAC, updateTodolistTitleAC,
    deleteTodolistAC, getTodolistsAC, TodolistDomainType,
    todolistsReducer, changeTodolistEntityStatusAC
} from "./todolistsSlice"
import {v1} from "uuid"
import {RequestStatusType} from "../../../App/appSlice";


test("correct todolist should be removed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ]

    const action = deleteTodolistAC({id: todolistId1})
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ]

    const endState = todolistsReducer(startState, createTodolistAC({
        todolist: {
            id: todolistId2,
            title: "New Todolist",
            addedDate: "",
            order: 0
        }
    }))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("New Todolist")
})

test("correct todolist should change its name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ]

    const action = updateTodolistTitleAC({id: todolistId2, title: "New Todolist"})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(action.payload.title)
})

test("correct filter of todolist should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ]

    const action = changeTodolistFilterAC({id: todolistId2, filter: "completed"})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(action.payload.filter)
})

test("set todolists", () => {

    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ]

    const action = getTodolistsAC({todolists: startState})

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)

})
test("correct entity status", () => {

    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
    ]

    const newStatus: RequestStatusType = "loading"

    const action = changeTodolistEntityStatusAC({id: todolistId1, status: newStatus})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe(newStatus)
    expect(endState[1].entityStatus).toBe("idle")

})