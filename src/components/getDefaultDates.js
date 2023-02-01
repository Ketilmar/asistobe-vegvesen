import moment from "moment/moment.js";

const getDefaultDates = (daysToGoBack) => {
  const date = moment().subtract(daysToGoBack, "days").format("YYYY-MM-DD")
  return date
};

const fromDateDefault = getDefaultDates(2);
const toDateDefault = getDefaultDates(1);

export { fromDateDefault, toDateDefault };
