import {
    addDays,
    addMonths,
    addQuarters,
    addYears
} from 'date-fns'

const changeDate = ({ date, type, changeValue }) => {
    switch (type) {
        case 'day':
        case 'days':
            return addDays(date, changeValue)
        case 'month':
            return addMonths(date, changeValue)
        case 'quarter':
            return addQuarters(date, changeValue)
        case 'year':
            return addYears(date, changeValue)
        default:
            return addDays(date, changeValue)
    }
}

export default changeDate;