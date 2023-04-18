import { getTimezones } from "./getTimezone.js";
import {date1, date2} from "./testDate.js"


const times = getTimezones(date1, date2)
console.log(times[1])
