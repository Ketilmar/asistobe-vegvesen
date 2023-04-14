import dayjs from "dayjs";

/** Gets default dates for the past 1-2 days */
const getDefaultDates = (daysToGoBack) => {
  const date = dayjs().subtract(daysToGoBack, "day").format("YYYY-MM-DD");
  return date;
};

const fromDateDefault = getDefaultDates(2);
const toDateDefault = getDefaultDates(1);

export { fromDateDefault, toDateDefault };
