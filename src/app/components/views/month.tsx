import React, { useState } from 'react';
import moment from 'moment';

const Month: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(moment().startOf('month'));

    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const days = [];
    let day = startOfMonth;

    while (day <= endOfMonth) {
        days.push(day.clone());
        day = day.add(1, 'day');
    }

    const goToPreviousMonth = () => {
        setCurrentMonth(prevMonth => prevMonth.clone().subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prevMonth => prevMonth.clone().add(1, 'month'));
    };

    const monthName = currentMonth.format('MMMM YYYY');

    return (
        <div>
            <div className="flex justify-between items-center mb-4">

                <button onClick={goToPreviousMonth} className="px-4 py-2 bg-gray-300 rounded">← Previous</button>

                <h2 className="text-lg font-semibold mb-1">{monthName}</h2>

                <button onClick={goToNextMonth} className="px-4 py-2 bg-gray-300 rounded">Next →</button>

            </div>

            <div className="grid grid-cols-7 gap-4">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((dayName, i) => (
                    <div key={i} className="text-center font-semibold">
                        {dayName}
                    </div>
                ))}
                {days.map((day, i) => (
                    <div key={i} className="border p-4 rounded-lg h-36">
                        <h3 className="font-semibold">{day.format('D')}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Month;
