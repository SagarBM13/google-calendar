import React, { useState } from 'react';
import moment from 'moment';

const DatePicker: React.FC<{ onSelectDate: (date: moment.Moment) => void }> = ({ onSelectDate }) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState(moment().startOf('month'));

    const startOfWeek = currentMonth.clone().startOf('week');
    const endOfWeek = currentMonth.clone().endOf('week');

    const daysInMonth = [];
    let day = startOfWeek;

    // Fill the array with days to cover the entire month view (including days from previous and next months)
    while (day <= currentMonth.clone().endOf('month').endOf('week')) {
        daysInMonth.push(day.clone());
        day = day.add(1, 'day');
    }

    const goToPreviousMonth = () => {
        setCurrentMonth(prevMonth => prevMonth.clone().subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prevMonth => prevMonth.clone().add(1, 'month'));
    };

    const goToPreviousYear = () => {
        setCurrentMonth(prevMonth => prevMonth.clone().subtract(1, 'year'));
    };

    const goToNextYear = () => {
        setCurrentMonth(prevMonth => prevMonth.clone().add(1, 'year'));
    };

    const handleDateClick = (date: moment.Moment) => {
        setSelectedDate(date);
        onSelectDate(date);
    };

    return (
        <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button onClick={goToPreviousYear} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                        &laquo;
                    </button>
                    <button onClick={goToPreviousMonth} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                        &larr;
                    </button>
                </div>
                <h2 className="text-lg font-semibold">
                    {currentMonth.format('MMMM YYYY')}
                </h2>
                <div className="flex space-x-2">
                    <button onClick={goToNextMonth} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                        &rarr;
                    </button>
                    <button onClick={goToNextYear} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                        &raquo;
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, i) => (
                    <div key={i} className="text-center font-semibold">
                        {dayName}
                    </div>
                ))}
                {daysInMonth.map((day, i) => (
                    <div
                        key={i}
                        className={`p-2 text-center rounded-lg cursor-pointer ${day.month() !== currentMonth.month() ? 'text-gray-400' : ''
                            } ${day.isSame(selectedDate, 'day') ? 'bg-blue-500 text-white' : 'bg-white'
                            } ${day.isSame(moment(), 'day') ? 'border border-red-500' : ''
                            }`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day.format('D')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatePicker;
