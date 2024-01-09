// Dependencies
import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from '../src/features/employees/employees'

const store = configureStore({
    reducer: {
        employees: employeesReducer,
    },
})

export default store