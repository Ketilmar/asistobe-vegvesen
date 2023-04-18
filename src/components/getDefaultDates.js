//import moment from "moment/moment.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

const getDefaultDates = (daysToGoBack) => {
  const date = dayjs().subtract(daysToGoBack, "day").format("YYYY-MM-DD");
  return date;
};

const fromDateDefault = getDefaultDates(2);
const toDateDefault = getDefaultDates(1);

export { fromDateDefault, toDateDefault };
