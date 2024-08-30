import React from 'react';
import { useDate } from '@/app/context/date-provider';

const Month: React.FC = () => {
    const { selectedDate, goToPreviousMonth, goToNextMonth } = useDate();

    const startOfMonth = selectedDate.clone().startOf('month');
    const endOfMonth = selectedDate.clone().endOf('month');
    const days = [];
    let day = startOfMonth;

    while (day <= endOfMonth) {
        days.push(day.clone());
        day = day.add(1, 'day');
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-4">

                <button onClick={goToPreviousMonth} className="px-4 py-2 bg-gray-300 rounded">← Previous</button>

                <h2 className="text-lg font-semibold mb-1">{selectedDate.format('MMMM YYYY')}</h2>

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
