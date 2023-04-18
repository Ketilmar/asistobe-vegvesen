import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import timezone from "dayjs/plugin/timezone.js" // dependent on utc plugin
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

const getTimezones = (from, to) => {
    const fromDate = dayjs.tz(`${from} 00:00`, "Europe/Oslo").format();
    const toDate = dayjs.tz(`${to} 00:00`, "Europe/Oslo").format();
    return [fromDate, toDate];
  };

export {getTimezones}


