import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employees: [],
}

const employeesSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload)
        },
        removeAllEmployees: (state) => {
            state.employees = []
        }
    }
})

const { actions, reducer } = employeesSlice

export const {
    addEmployee,
    removeAllEmployees,
} = actions

export default reducer

