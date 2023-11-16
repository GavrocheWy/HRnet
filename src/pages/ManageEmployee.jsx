// Dependencies
import { NavLink } from "react-router-dom"

const ManageEmployee = () => {
    return (
        <main>
            <div>
                <h1>Current Employees</h1>
                <table></table>
                <NavLink to="/">Home</NavLink>
            </div>
        </main>
    )
}

export default ManageEmployee