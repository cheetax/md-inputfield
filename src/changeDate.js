import {
    addDays,
    addMonths,
    addQuarters,
    addYears,
    isLastDayOfMonth,
    endOfMonth,
    startOfMonth
} from 'date-fns'

const changeDate = ({ date, type, changeValue }) => {
    switch (type) {
        case 'day':
        case 'days':
            return addDays(date, changeValue)
        case 'month':
            return isLastDayOfMonth(date) && endOfMonth(addMonths(date, changeValue)) || startOfMonth(addMonths(date, changeValue))
        case 'quarter':
            return isLastDayOfMonth(date) && endOfMonth(addQuarters(date, changeValue)) || startOfMonth(addQuarters(date, changeValue))
        case 'year':
            return addYears(date, changeValue)
        default:
            return addDays(date, changeValue)
    }
}

export default changeDate;