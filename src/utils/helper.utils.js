import moment from "moment";

export const getRelativeDate = (dateString) => {
  const date = moment(dateString, "YYYY-MM-DD");
  const today = moment().startOf("day");
  const diff = date.diff(today, "days");

  switch (diff) {
    case 0:
      return "today";
    case 1:
      return "tomorrow";
    case -1:
      return "yesterday";
    default:
      return date.format("dddd");
  }
};
