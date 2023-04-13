import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

const getDefaultDates = (daysToGoBack) => {
  const date = dayjs().subtract(daysToGoBack, "day").format("YYYY-MM-DD");
  return date;
};

const fromDateDefault = getDefaultDates(2);
const toDateDefault = getDefaultDates(1);

export { fromDateDefault, toDateDefault };
