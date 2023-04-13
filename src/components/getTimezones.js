import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js"; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const getTimezones = (from, to) => {
  const fromDate = dayjs.tz(`${from} 00:00`, "Europe/Oslo").format();
  const toDate = dayjs.tz(`${to} 00:00`, "Europe/Oslo").format();
  return [fromDate, toDate];
};

export { getTimezones };
