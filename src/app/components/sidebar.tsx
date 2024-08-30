import React, { useState } from 'react';
import DatePicker from '@/app/components/date-picker';
import moment from 'moment';

const Sidebar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

    const handleDateSelect = (date: moment.Moment) => {
        setSelectedDate(date);
    };
    return (
        <div className="w-1/4 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4">Calendar</h2>
            {/* You can replace this with a real calendar component */}
            <div className="bg-white p-4 shadow rounded-lg">
                <DatePicker onSelectDate={handleDateSelect} />
            </div>
        </div>
    );
};

export default Sidebar;
