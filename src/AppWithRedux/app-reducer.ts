export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

type ActionsType = SetErrorAT | SetStatusAT
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
const initialState: InitialStateType = {
    status: "idle",
    error: null
}

type SetErrorAT = ReturnType<typeof setErrorAC>
type SetStatusAT = ReturnType<typeof setStatusAC>

export const setErrorAC = (error: string | null) => ({
    type: "APP/SET-ERROR",
    error
} as const)

export const setStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET-STATUS",
    status
} as const)