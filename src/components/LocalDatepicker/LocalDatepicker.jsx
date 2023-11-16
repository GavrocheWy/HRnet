// Dependencies
import React from 'react'
import { useState, useEffect } from 'react'
// Helpers
import formatDate from './helpers/formatDate'
import updateDatepicker from './helpers/updateDatepicker'
// Options
import MONTHS from './options/months'
import DAYS from './options/days'

const LocalDatepicker = ({ callback, minDate, maxDate }) => {

    const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)
    const [isDateConfigOpen, setIsDateConfigOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [year, setYear] = useState(selectedDate.getFullYear())
    const [month, setMonth] = useState(selectedDate.getMonth())
    const [dates, setDates] = useState([])
    const [formattedSelectedDate, setFormattedSelectedDate] = useState(formatDate(selectedDate))

    // Change month and newYear when date is modified
    useEffect(() => {
        console.log(formatDate(selectedDate))
        setFormattedSelectedDate(formatDate(selectedDate))
        setYear(selectedDate.getFullYear())
        setMonth(selectedDate.getMonth())
        setIsDatepickerOpen(false)
        setIsDateConfigOpen(false)
    }, [selectedDate])

    // Change datepicker display when month and year are modified
    useEffect(() => {
        setDates(updateDatepicker(month, year))
    }, [month, year])

    // Set next month
    const setNextMonth = () => {
        const nextMonth = new Date(year, month + 1).getMonth()
        const nextYear = new Date(year, month + 1).getFullYear()
        setMonth(nextMonth)
        setYear(nextYear)
    }

    // Set prev month
    const setPrevMonth = () => {
        const prevMonth = new Date(year, month - 1).getMonth()
        const prevYear = new Date(year, month - 1).getFullYear()
        setMonth(prevMonth)
        setYear(prevYear)
    }

    // Reset date
    const resetDate = () => {
        setSelectedDate(new Date())
        setFormattedSelectedDate('')
    }

    return (
        <React.Fragment>
            <div className='datepicker-wrapper'>
                <input
                    className='datepicker-input'
                    type="text"
                    readOnly
                    value={formattedSelectedDate}
                    onFocus={() => setIsDatepickerOpen(true)}
                />
                {isDatepickerOpen &&
                    <aside className='datepicker'>
                        <header className='datepicker-header'>
                            <div className='datepicker-header__action prev' onClick={() => setPrevMonth()}>←</div>
                            <h1 onClick={() => setIsDateConfigOpen(!isDateConfigOpen)}>{MONTHS.find(m => m.index === month).label.substring(0, 3) + ' ' + year}</h1>
                            <div className='datepicker-header__action next' onClick={() => setNextMonth()}>→</div>
                        </header>
                        <main className='datepicker-body'>
                            <div className='datepicker-body__date-selection'>
                                <ul className='datepicker-body__days'>
                                    {DAYS.map((day, i) => <li key={`day-${i}`}>{day.label.substring(0, 3)}</li>)}
                                </ul>
                                <ul className='datepicker-body__dates'>{dates.length && dates.map((date, i) => <li className={`${formatDate(date.fullDate) === formatDate(selectedDate) ? 'is-active' : ''} ${formatDate(date.fullDate) === formatDate(new Date()) ? 'is-today' : ''} ${date.classes}`} onClick={() => setSelectedDate(date.fullDate)} key={`${i}-date`}>{date.day}</li>)}</ul>
                            </div>
                            {isDateConfigOpen &&
                                <div className='datepicker-body__date-config'></div>
                            }
                        </main>
                        <footer className='datepicker-footer'><div onClick={() => resetDate()} className='datepicker-footer__actions'>Réinitialiser</div></footer>
                    </aside>
                }
            </div>
        </React.Fragment >
    )
}

export default LocalDatepicker