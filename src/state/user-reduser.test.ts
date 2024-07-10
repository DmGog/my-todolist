import {userReducer} from "./user-reducer";

test("user reduser should increment only age", () => {

    const startState = {age: 20, childrenCount: 2, name: "vasy"}
    const endState = userReducer(startState, {type: "INCREMENT-AGE"})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test("user reduser should increment only childrenCount", () => {

    const startState = {age: 20, childrenCount: 2, name: "Vasy"}
    const endState = userReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test("user reduser should change name of user", () => {

    const startState = {name: "Petr", age: 20, childrenCount: 2}
    const newName = "Ivan"
    const endState = userReducer(startState, {type: "CHANGE-NAME", newName})

    expect(endState.name).toBe(newName)

})