// Dependencies
import { NavLink } from "react-router-dom"
import LocalDatepicker from "../components/LocalDatepicker/LocalDatepicker"
import { useState } from "react"
// import { Datepicker } from "@gavrochewy/react-ocgw-datepicker"

const CreateEmployee = () => {

    const [input, setInput] = useState('Oui')

    return (
        <main>
            <section>
                <div className="title">
                    <h1>HRnet</h1>
                </div>
                <div className="container">
                    <NavLink to="/manage">View Current Employees</NavLink>
                    <h2>Create Employee</h2>
                    <form action="">
                        {/* <Datepicker name="Test"></Datepicker> */}
                        <LocalDatepicker value={input} callback={(e) => setInput(e)}></LocalDatepicker>
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" />
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" />
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input id="date-of-birth" type="text" />
                        <label htmlFor="start-date">Start Date</label>
                        <input id="start-date" type="text" />
                        <fieldset className="address">
                            <legend>Address</legend>
                            <label htmlFor="street">Street</label>
                            <input id="street" type="text" />
                            <label htmlFor="city">City</label>
                            <input id="city" type="text" />
                            <label htmlFor="state">State</label>
                            <select name="state" id="state"></select>
                            <label htmlFor="zip-code">Zip Code</label>
                            <input id="zip-code" type="number" />
                        </fieldset>
                        <label htmlFor="department">Department</label>
                        <select name="department" id="department">
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </select>
                    </form>
                    <button onClick={() => console.log(input)}>Save</button>
                </div>
                <div id="confirmation" className="modal">Employee Created!</div>
            </section>
        </main>
    )
}

export default CreateEmployee