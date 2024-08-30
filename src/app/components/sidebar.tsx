import React from 'react';
import DatePicker from '@/app/components/date-picker';


const Sidebar: React.FC = () => {

    return (
        <div className="w-1/4 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4">Calendar</h2>
            <div className="bg-white p-4 shadow rounded-lg">
                <DatePicker />
            </div>
        </div>
    );
};

export default Sidebar;
