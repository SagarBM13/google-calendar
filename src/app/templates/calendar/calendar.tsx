"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import Day from '@/app/components/views/day';
import Week from '@/app/components/views/week';
import Month from '@/app/components/views/month';

const Calendar: React.FC = () => {
    const [view, setView] = useState<'day' | 'week' | 'month'>('day');

    const renderView = () => {
        switch (view) {
            case 'day':
                return <Day />;
            case 'week':
                return <Week />;
            case 'month':
                return <Month />;
            default:
                return <Month />;
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-3/4 bg-white p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-semibold">My Calendar</h1>
                    <div>
                        <button
                            className={`px-4 py-2 mr-2 ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                } rounded`}
                            onClick={() => setView('day')}
                        >
                            Day
                        </button>
                        <button
                            className={`px-4 py-2 mr-2 ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                } rounded`}
                            onClick={() => setView('week')}
                        >
                            Week
                        </button>
                        <button
                            className={`px-4 py-2 ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                } rounded`}
                            onClick={() => setView('month')}
                        >
                            Month
                        </button>
                    </div>
                </div>
                {renderView()}
            </div>
        </div>
    );
};

export default Calendar;
