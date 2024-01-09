// Dependencies
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
// Components
import Table from "../components/Table/Table"

const ManageEmployee = () => {

    const { employees } = useSelector((state) => state.employees)
    const PROPERTIES_TO_SHOWN = [
        {
            value: "firstName",
            label: "First name"
        },
        {
            value: "lastName",
            label: "Last name"
        },
        {
            value: "startDate",
            label: "Start date"
        },
        {
            value: "department",
            label: "Department"
        },
        {
            value: "birthDate",
            label: "Date of Birth"
        },
        {
            value: "street",
            label: "Street"
        },
        {
            value: "city",
            label: "City"
        },
        {
            value: "state",
            label: "State"
        },
        {
            value: "zipcode",
            label: "Zip Code"
        },
    ]

    return (
        <main className="main-page">
            <section className="main-section">
                <div className="header">
                    <h1 className="header-logo">HRnet</h1>
                </div>
                <div className="container">
                    <h2 className="main-title">Current Employees</h2>
                </div>
                <Table entries={employees} properties={PROPERTIES_TO_SHOWN} />
                {/* <div id="confirmation" className="modal">Employee Created!</div> */}
            </section>
            <NavLink className="main-link" to="/">Create a new employee</NavLink>
        </main>
    )
}

export default ManageEmployee