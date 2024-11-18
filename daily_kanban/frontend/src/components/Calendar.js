import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../static/css/calendar.css';


function Cal() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} calendarType='iso8601' />
    </div>
  );
}

export default Cal;