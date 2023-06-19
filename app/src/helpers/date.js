import moment from 'moment'
const dateToString = date => moment(date).toDate().toDateString()

export default dateToString;