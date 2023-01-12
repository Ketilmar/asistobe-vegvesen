const getDefaultDates = (daysToGoBack) => {
  const getDay = new Date().getDate();
  const getMonth = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  //Takes in a number below 10 and returns a 0 in front of that number
  //Example:
  //1 -> 01
  //9 -> 09
  const setDoubleDigits = (num) => {
    if (num < 10) {
      return `${0}${num}`;
    } else {
      return num;
    }
  };

  // const day = setDoubleDigits(getDate)
  const month = setDoubleDigits(getMonth);
  const day = setDoubleDigits(getDay - daysToGoBack);

  return `${year}-${month}-${day}`;
};

const fromDateDefault = getDefaultDates(2);
const toDateDefault = getDefaultDates(1);

export { fromDateDefault, toDateDefault };
