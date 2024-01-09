const generateEmployee = (firstName, lastName, birthDate, startDate, street, city, state, zipcode, department) => {

    if (!firstName || !lastName || !birthDate || !startDate || !street || !city || !state || !zipcode || !department) {
        console.log("Informations are missing.")
        return false
    }

    return (
        {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            startDate: startDate,
            street: street,
            city: city,
            state: state,
            zipcode: zipcode,
            department: department
        }
    )
}

export default generateEmployee