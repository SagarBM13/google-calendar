import React from 'react';
import moment from 'moment';
import { useDate } from '@/app/context/date-provider';

const DatePicker: React.FC = () => {
    const { selectedDate,
        setSelectedDate,
        goToPreviousMonth,
        goToNextMonth,
        goToPreviousYear,
        goToNextYear,
        resetToToday,
        handleDateClick } = useDate();
    const currentMonth = moment(selectedDate).startOf('month');

    const startOfWeek = currentMonth.clone().startOf('week');

    const daysInMonth = [];
    let day = startOfWeek;

    while (day <= currentMonth.clone().endOf('month').endOf('week')) {
        daysInMonth.push(day.clone());
        day = day.add(1, 'day');
    }

    return (
        <div className="border p-4 rounded-lg">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button onClick={goToPreviousYear} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                            &laquo;
                        </button>
                        <button onClick={goToPreviousMonth} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                            &larr;
                        </button>
                        <button onClick={goToNextMonth} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                            &rarr;
                        </button>
                        <button onClick={goToNextYear} className="text-xl px-2 py-1 bg-gray-200 rounded-lg">
                            &raquo;
                        </button>
                    </div>
                    <h2 className="text-lg font-semibold">
                        {currentMonth.format('MMMM YYYY')}
                    </h2>
                </div>
                <div className="flex justify-center mb-4">
                    <button onClick={resetToToday} className="text-xl px-2 py-1 bg-green-500 text-white rounded-lg">
                        Today
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
