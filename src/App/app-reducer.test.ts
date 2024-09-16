import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./appSlice";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})
test("correct error message", () => {
    const endState = appReducer(startState, setAppErrorAC({error: "some error"}))
    expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
    const endState = appReducer(startState, setAppStatusAC({status: "loading"}))
    expect(endState.status).toBe("loading")
})