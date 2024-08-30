import React, { useState } from 'react';
import moment from 'moment';
import dayJson from '@/app/data/day-events.json';
// Event interface to define the structure of an event
interface Event {
    time: string;
    title: string;
    person: string;
}

// JSON data for multiple people's events
const events: Event[] = dayJson;

const Day: React.FC = () => {
    // State to track the current date
    const [currentDate, setCurrentDate] = useState(moment());

    // Generate the hours for the current day
    const startOfDay = currentDate.clone().startOf('day');
    const hours = [...Array(24)].map((_, i) => startOfDay.clone().add(i, 'hours'));

    // Function to navigate to the previous day
    const goToPreviousDay = () => {
        setCurrentDate(prevDate => prevDate.clone().subtract(1, 'day'));
    };

    // Function to navigate to the next day
    const goToNextDay = () => {
        setCurrentDate(prevDate => prevDate.clone().add(1, 'day'));
    };

    // Function to filter events for a specific hour
    const getEventsForHour = (hour: moment.Moment) => {
        return events.filter(event => moment(hour).format('hh:mm A') === event.time);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousDay} className="px-4 py-2 bg-gray-300 rounded">← Previous</button>

                <h2 className="text-lg font-semibold">
                    {currentDate.format('MMMM Do, YYYY')}
                </h2>
                <button onClick={goToNextDay} className="px-4 py-2 bg-gray-300 rounded">Next →</button>

            </div>
            <div className="grid grid-cols-12 gap-4">
                {/* Hour column heading */}
                <div className="col-span-2 font-semibold">Time</div>
                <div className="col-span-10 font-semibold">Events</div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                {hours.map((hour, i) => (
                    <React.Fragment key={i}>
                        {/* Hour column */}
                        <div className="col-span-2 border p-2 rounded-lg bg-gray-100">
                            {hour.format('h:mm A')}
                        </div>
                        {/* Event column */}
                        <div className="col-span-10 border p-2 rounded-lg">
                            <div className="grid grid-cols-3 gap-2">
                                {getEventsForHour(hour).map((event, j) => (
                                    <div key={j} className="border p-2 rounded-lg bg-blue-100">
                                        <strong>{event.person}:</strong> {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Day;
