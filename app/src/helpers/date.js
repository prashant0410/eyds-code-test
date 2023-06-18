import moment from 'moment'
const dateToString = date => moment(new Date(date).toDateString());

export default dateToString;