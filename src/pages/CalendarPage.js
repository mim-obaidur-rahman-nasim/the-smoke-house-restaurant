import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import FooterPage from "../components/Footer/FooterPage";


const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
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
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const numDays = daysInMonth[currentMonth];

  const calendar = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        week.push(<td key={`${i}-${j}`}></td>);
      } else {
        week.push(
          <td key={`${i}-${j}`} className="border border-gray-300">
            {day}
          </td>
        );
        day++;
      }
      if (day > numDays) break;
    }
    calendar.push(<tr key={i}>{week}</tr>);
    if (day > numDays) break;
  }

  return (
    <div>
<div className="flex flex-col justify-center items-center min-h-screen pt-8 px-10 py-20">
      <div className="w-full max-w-md">
        <table className="w-full text-center">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th key={day} className="border border-gray-300">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{calendar}</tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-2"
        >
          Prev
        </button>
        <span className="text-xl font-bold">{months[currentMonth]} {currentYear}</span>
        <button
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-2"
        >
          Next
        </button>
      </div>   
    </div>
    <FooterPage />
    </div>
    
  );
};

export default CalendarPage;