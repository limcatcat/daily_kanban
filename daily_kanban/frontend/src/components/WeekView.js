import React, { useState, useEffect } from "react";
import { startOfWeek, addDays, format, isToday } from "date-fns";
import '../../static/css/week-view.css'


const WeekView = ({selectedDate}) => {
    const [currentWeek, setCurrentWeek] = useState([]);


const generateWeek = (referenceDate) => {
    const start = startOfWeek(referenceDate, {weekStartsOn: 1});
    return Array.from({length: 7}, (_, i) => addDays(start, i));
};


useEffect(() => {
    setCurrentWeek(generateWeek(selectedDate));
}, [selectedDate]);


return (
    <>
        {currentWeek.map((date) => (
            <div key={date} className={`day ${isToday(date) ? "is-today":""}`}>
                <div className="day-container">

                <span className="weekday">{format(date, "EEE")}</span>
                <span className="date">{format(date, "d")}</span>

                </div>
            </div>
        ))}
    </>
);

};

export default WeekView;