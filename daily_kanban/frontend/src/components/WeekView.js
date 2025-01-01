import React, { useState, useEffect } from "react";
import { startOfWeek, addDays, format, isToday, addWeeks, subWeeks } from "date-fns";
import '../../static/css/week-view.css'
import { useTaskContext } from "../context/TaskContext";


const WeekView = () => {
    const {selectedDate, setSelectedDate, selectedMonth} = useTaskContext();
    const [currentWeek, setCurrentWeek] = useState([]);


const generateWeek = (referenceDate) => {
    const start = startOfWeek(referenceDate, {weekStartsOn: 1});
    return Array.from({length: 7}, (_, i) => addDays(start, i));
};


useEffect(() => {
    setCurrentWeek(generateWeek(selectedDate));
}, [selectedDate]);


const goToPreviousWeek = () => {
    const previousWeekStart = subWeeks(selectedDate, 1);
    setSelectedDate(previousWeekStart);
};

const goToNextWeek = () => {
    const nextWeekStart = addWeeks(selectedDate, 1);
    setSelectedDate(nextWeekStart);
};

const isSelectedDate = (date) => {
    return format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'selected' : ''
};

const getMonthName = (selectedMonth) => {

    let month;

    switch (selectedMonth) {
        case 0:
            month = 'JAN'
            break;
        case 1:
            month = 'FEB'
            break;
        case 2:
            month = 'MAR'
            break;
        case 3:
            month = 'APR'
            break;
        case 4:
            month = 'MAY'
            break;
        case 5:
            month = 'JUN'
            break;
        case 6:
            month = 'JUL'
            break;
        case 7:
            month = 'AUG'
            break;
        case 8:
            month = 'SEP'
            break;
        case 9:
            month = 'OCT'
            break;
        case 10:
            month = 'NOV'
            break;
        case 11:
            month = 'DEC'
            break;
    }

    return month;
}



return (
    <div className="week-container">
        <div className="month">{getMonthName(selectedMonth)}</div>
            <div className="week-row">
                <span className="week-change" onClick={goToPreviousWeek}>{"＜"}</span>
                {currentWeek.map((date) => (
                    <div key={date} className={`day ${isToday(date) ? "is-today":""}`}>
                        <div className="day-container">

                        <span className={`weekday ${isSelectedDate(date)}`}>{format(date, "EEE")}</span>
                        <span className={`date ${isSelectedDate(date)}`}
                            onClick={() =>
                                {
                                    setSelectedDate(date)
                                }}
                                >{format(date, "d")}</span>

                        </div>
                    </div>
                ))}
                <span className="week-change" onClick={goToNextWeek}>{"＞"}</span>
            </div>
    </div>
);

};

export default WeekView;