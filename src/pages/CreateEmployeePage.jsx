// Dependencies
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { Datepicker } from '@gavrochewy/react-ocgw-datepicker'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../features/employees/employees'
import generateEmployee from "../helpers/generateEmployee"
// Components
import LocalSelect from "../components/LocalSelect/LocalSelect"
import Modal from "../components/Modal/Modal"
// Options
import STATES from "../options/states"
import CITIES from "../options/cities"
import NAMES from "../options/names"
import DEPARTMENTS from "../options/departments"
import formatDate from "../helpers/formatDate"

const CreateEmployeePage = () => {

    const dispatch = useDispatch()

    const MIN_DATE = new Date()
    const MAX_DATE = new Date("2024-12-31")
    const INITIAL_DATE = new Date()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState()
    const [startDate, setStartDate] = useState()
    const [adressStreet, setAdressStreet] = useState("")
    const [adressCity, setAdressCity] = useState("")
    const [adressState, setAdressState] = useState()
    const [zipCode, setZipCode] = useState(0)
    const [department, setDepartment] = useState()

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)

    const resetData = () => {
        setFirstName("")
        setLastName("")
        setDateOfBirth()
        setStartDate()
        setAdressStreet("")
        setAdressCity("")
        setAdressState()
        setZipCode(0)
        setDepartment()
    }

    const createEmployee = () => {
        if (firstName && lastName && dateOfBirth && startDate && adressStreet && adressCity && adressState && zipCode && department) {
            dispatch(addEmployee(generateEmployee(firstName, lastName, formatDate(dateOfBirth), formatDate(startDate), adressStreet, adressCity, adressState, zipCode, department)))
            setIsConfirmationModalOpen(true)
            resetData()
        } else {
            setIsWarningModalOpen(true)
        }
    }

    // Dev create a lot of employees
    const createTestEmployees = (number) => {

        const generateRandomDate = (from, to) => {
            return new Date(
                from.getTime() +
                Math.random() * (to.getTime() - from.getTime()),
            );
        }

        for (let i = 1; i <= number; i++) {
            dispatch(addEmployee(generateEmployee(
                NAMES[Math.floor(Math.random() * NAMES.length)],
                NAMES[Math.floor(Math.random() * NAMES.length)],
                formatDate(generateRandomDate(new Date('1935-01-01'), new Date('2005-01-01'))),
                formatDate(generateRandomDate(new Date('2024-01-01'), new Date('2024-12-31'))),
                `${Math.floor(10 + Math.random() * 90)} rue ${NAMES[Math.floor(Math.random() * NAMES.length)]}`,
                CITIES[Math.floor(Math.random() * CITIES.length)],
                STATES[Math.floor(Math.random() * STATES.length)].label,
                Math.floor(10000 + Math.random() * 90000),
                DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)].label,
            )))
        }
    }

    return (
        <main className="main-page">
            <section className="main-section">
                <div className="header">
                    <h1 className="header-logo">HRnet</h1>
                </div>
                <div className="container">
                    <h2 className="main-title">Create Employee</h2>
                    <form className="form" action="">
                        <label htmlFor="first-name">First Name</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-input" type="text" id="first-name" />
                        <label htmlFor="last-name">Last Name</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-input" type="text" id="last-name" />
                        <label className="" htmlFor="first-name">Date of Birth</label>
                        <Datepicker callback={(date) => setDateOfBirth(date)} inputClasses="form-input" />
                        <label htmlFor="start-date">Start Date</label>
                        <Datepicker maxDate={MAX_DATE} minDate={MIN_DATE} initialDate={INITIAL_DATE} callback={(date) => setStartDate(date)} inputClasses="form-input" />
                        <fieldset className="form-fielset address">
                            <legend>Address</legend>
                            <label htmlFor="street">Street</label>
                            <input value={adressStreet} onChange={(e) => setAdressStreet(e.target.value)} className="form-input" id="street" type="text" />
                            <label htmlFor="city">City</label>
                            <input value={adressCity} onChange={(e) => setAdressCity(e.target.value)} className="form-input" id="city" type="text" />
                            <label htmlFor="state">State</label>
                            <LocalSelect options={STATES} callback={(loc) => setAdressState(loc)} inputClasses={"form-select"} />
                            <label htmlFor="zip-code">Zip Code</label>
                            <input min={0} max={99999} data-error="Please enter a valid zipcode." value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="form-input" id="zip-code" type="number" />
                        </fieldset>
                        <label htmlFor="department">Department</label>
                        <LocalSelect options={DEPARTMENTS} callback={(dep) => setDepartment(dep)} inputClasses={"form-select"} />
                    </form>
                    <button className="form-cta" onClick={() => createEmployee()}>Save</button>
                </div>
                {/* <div id="confirmation" className="modal">Employee Created!</div> */}
            </section>
            <NavLink className="main-link" to="/manage">View Current Employees</NavLink>
            <button onClick={() => createTestEmployees(37)}>Create test employees</button>
            <Modal isOpen={isConfirmationModalOpen} closeButtonCallback={() => setIsConfirmationModalOpen(false)} modalContent={"Employee has been created !"} />
            <Modal isOpen={isWarningModalOpen} closeButtonCallback={() => setIsWarningModalOpen(false)} modalContent={"Please fill informations bellow in a valid format."} />
        </main>
    )
}

export default CreateEmployeePage