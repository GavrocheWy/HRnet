// Dependencies
import { useEffect, useState } from "react"

const LocalSelect = ({ options, callback, inputClasses }) => {

    const [optionsAvailable, setOptionsAvailable] = useState([])
    const [selectedOption, setSelectedOption] = useState()

    // Retrives options and place them in optionsAvailable if they correspond to valid format
    useEffect(() => {
        let allOptionsAvailable = []
        if (options?.length) {
            for (const option of options) {
                if (option?.value && option?.label) {
                    allOptionsAvailable.push(option)
                } else {
                    console.log('You provided an option without a label or a value in your LocalSelect component.')
                }
            }
        }
        if (allOptionsAvailable?.length) {
            setSelectedOption(allOptionsAvailable[0].value)
            setOptionsAvailable(allOptionsAvailable)
        }
    }, [options])

    // Return option selected in callback function
    useEffect(() => {
        if (selectedOption && callback) {
            callback(selectedOption)
        }
    }, [selectedOption, callback])

    return (
        <select onChange={(e) => setSelectedOption(e.target.value)} className={inputClasses}>
            {
                optionsAvailable && optionsAvailable.map(option => (
                    option?.label && <option key={"option" + option.value} value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}

export default LocalSelect