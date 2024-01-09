// Dependencies
import { useEffect, useState } from "react"

const Table = ({ entries, properties }) => {

    const [displayedEntries, setDisplayedEntries] = useState([])
    const [shownEntries, setShownEntries] = useState([])
    const [shownEntriesNumber, setShownEntriesNumber] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [displayedProperties, setDisplayedProperties] = useState([])
    const [sort, setSort] = useState()
    const [isSortAscending, setIsSortAscending] = useState()
    const [searchQuery, setSearchQuery] = useState("")

    const SHOWN_ENTRIES_NUMBER_OPTIONS = [10, 25, 50, 100]

    useEffect(() => {
        let filteredEntries = []
        let sortedEntries = []
        if (entries?.length) {
            // Filter by search query
            if (displayedProperties?.length && searchQuery) {
                for (const entry of entries) {
                    if (!filteredEntries.includes(entry)) {
                        for (const prop of displayedProperties) {
                            if (entry[prop.value].toString().includes(searchQuery)) {
                                filteredEntries.push(entry)
                            }
                        }
                    }
                }
            } else {
                filteredEntries = entries
            }
            // Sort entries by current sort
            if (sort) {
                const sortProperty = displayedProperties.find(prop => prop.id === sort)
                sortedEntries = [...filteredEntries];
                if (isSortAscending) { sortedEntries.sort((a, b) => a[sortProperty.value].toString().localeCompare(b[sortProperty.value].toString())); }
                if (!isSortAscending) { sortedEntries.sort((a, b) => b[sortProperty.value].toString().localeCompare(a[sortProperty.value].toString())); }
            } else {
                sortedEntries = filteredEntries
            }
        }
        setDisplayedEntries(sortedEntries)
        setCurrentPage(1)
    }, [entries, displayedProperties, shownEntriesNumber, searchQuery, sort, isSortAscending])

    useEffect(() => {
        setShownEntries(displayedEntries.slice((shownEntriesNumber * currentPage) - shownEntriesNumber, shownEntriesNumber * currentPage))
    }, [displayedEntries, shownEntriesNumber, currentPage])

    useEffect(() => {
        const propertiesToShown = []
        if (properties?.length) {
            let propIndex = 1
            for (const prop of properties) {
                if (!prop.label) return;
                if (!prop.value) return;
                const property = {
                    label: prop.label,
                    value: prop.value,
                    id: propIndex
                }
                propIndex++
                propertiesToShown.push(property)
            }
        }
        setDisplayedProperties(propertiesToShown)
    }, [properties])

    const setCurrentSort = (sortCode) => {
        if (sortCode === sort) {
            setIsSortAscending(!isSortAscending)
        } else {
            setSort(sortCode)
            setIsSortAscending(true)
        }
    }

    const nextPage = () => {
        const nextPage = currentPage + 1
        nextPage <= (displayedEntries.length / shownEntriesNumber) + 1 && setCurrentPage(nextPage)
    }

    const prevPage = () => {
        const prevPage = currentPage - 1
        prevPage > 0 && setCurrentPage(prevPage)
    }

    return (

        <div className="employee-table__wrapper">
            <div className="employee-table__controls">
                <div className="employee-table__controls-select">
                    <p>Show</p>
                    <select className="form-select" value={shownEntriesNumber} onChange={(e) => setShownEntriesNumber(e.target.value)} name="" id="">
                        {SHOWN_ENTRIES_NUMBER_OPTIONS?.length && SHOWN_ENTRIES_NUMBER_OPTIONS.map(entry => (
                            <option key={entry} value={entry}>{entry}</option>
                        ))}
                    </select>
                    <p>entries</p>
                </div>
                <div className="employee-table__controls-search">
                    <label htmlFor="">Search :</label>
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-input" type="text" />
                </div>
            </div>

            <table className="employee-table">
                <thead className="employee-table__header">
                    <tr>
                        {displayedProperties?.length ? displayedProperties.map((prop, i) => (
                            <th key={"prop" + i}>{prop.label}<span className={`employee-table__sort-icon ${sort === prop.id ? 'on' : 'off'}`} onClick={() => setCurrentSort(prop.id)}>{isSortAscending && sort === prop.id ? "▲" : "▼"}</span></th>
                        ))
                            : <th>Aucune propriété affichée.</th>
                        }
                    </tr>
                </thead>
                <tbody className="employee-table__body">
                    {
                        shownEntries?.length ? shownEntries.map((employee, i) => (
                            <tr key={"employee" + i}>
                                {displayedProperties?.length ? displayedProperties.map((prop) => (
                                    <td key={"employee" + prop.value + i}>{employee[prop.value] ? employee[prop.value] : 'Empty'}</td>
                                ))
                                    : <td>Aucune propriété affichée.</td>
                                }
                            </tr>
                        )) :
                            <tr className="table__no-result">
                                <td>Aucun résultat.</td>
                            </tr>

                    }

                </tbody>
            </table>

            <div className="employee-table__pagination">
                <p>Showing {(shownEntriesNumber * currentPage) - shownEntriesNumber} to {shownEntriesNumber * currentPage} of {displayedEntries.length}</p>
                <div className="employee-table__pagination-controls">
                    <button className="form-input" disabled={(currentPage - 1) === 0} onClick={() => prevPage()}>Previous</button>
                    <p>{currentPage}</p>
                    <button className="form-input" disabled={(currentPage + 1 >= (displayedEntries.length / shownEntriesNumber) + 1)} onClick={() => nextPage()}>Next</button>
                </div>
            </div>
        </div>

    )
}

export default Table