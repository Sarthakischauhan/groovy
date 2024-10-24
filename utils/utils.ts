import moment from "moment"

const getDateWeekBack = () => {
    let date = new Date().toISOString();
    let sixMonthsBeforeDate = moment(date).subtract(7, 'days').toISOString();
    return sixMonthsBeforeDate;
}

export {
    getDateWeekBack
}