// import React from "react";
// import { format, parseISO } from "date-fns";

// interface DateTimeComponentProps {
//   dateString: string;
// }

// const DateTimeComponent: React.FC<DateTimeComponentProps> = ({
//   dateString,
// }) => {
//   const date = parseISO(dateString);
//   const formattedDate = format(date, "HH:mm:ss dd/MM/yyyy");

//   return <div>{formattedDate}</div>;
// };

// export default DateTimeComponent;
import React from "react";
import { format, parseISO } from "date-fns";

interface DateTimeComponentProps {
  dateString: string | undefined;
}

const DateTimeComponent: React.FC<DateTimeComponentProps> = ({
  dateString,
}) => {
  if (!dateString) {
    return null; // or return a default value or message
  }

  try {
    const date = parseISO(dateString);
    const formattedDate = format(date, "HH:mm:ss dd/MM/yyyy");
    return <div>{formattedDate}</div>;
  } catch (error) {
    console.error("Invalid date format:", dateString);
    return null; // or return a default value or message
  }
};

export default DateTimeComponent;
