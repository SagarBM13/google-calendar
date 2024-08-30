import React, { useState } from 'react';
import moment from 'moment';

const Week: React.FC = () => {
    const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));

    const startOfWeek = currentWeek.clone().startOf('week');
    const endOfWeek = currentWeek.clone().endOf('week');
    const days = [...Array(7)].map((_, i) => startOfWeek.clone().add(i, 'days'));

    const handlePrevWeek = () => {
        setCurrentWeek(prev => prev.clone().subtract(1, 'week'));
    };

    const handleNextWeek = () => {
        setCurrentWeek(prev => prev.clone().add(1, 'week'));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevWeek} className="px-4 py-2 bg-gray-300 rounded">← Previous</button>
                <div className="text-lg font-semibold">
                    {startOfWeek.format('MMMM D')} - {endOfWeek.format('MMMM D')}
                </div>
                <button onClick={handleNextWeek} className="px-4 py-2 bg-gray-300 rounded">Next →</button>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border bg-gray-200 p-2 table-cell" style={{ width: '120px', height: '50px' }}>Time</th>
                        {days.map((day, i) => (
                            <th key={i} className="border bg-gray-100 text-center p-2 table-cell" style={{ width: '120px', height: '50px' }}>
                                <div>{day.format('dddd')}</div>
                                <div>{day.format('MMMM Do')}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(24)].map((_, i) => (
                        <tr key={i}>
                            <td className="border text-center p-4 table-cell" style={{ width: '120px', height: '50px' }}>
                                {moment().startOf('day').add(i, 'hours').format('h:00 A')}
                            </td>
                            {days.map((_, j) => (
                                <td key={j} className="border p-4 table-cell" style={{ width: '120px', height: '50px' }}>
                                    {/* Placeholder for events */}
                                    <div></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Week;
