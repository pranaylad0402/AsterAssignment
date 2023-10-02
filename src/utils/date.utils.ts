export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Function to add 'th', 'st', 'nd', or 'rd' to the day
  function getDayWithSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  const formattedDate = `${getDayWithSuffix(day)} ${
    monthNames[monthIndex]
  } ${year}`;
  return formattedDate;
};
