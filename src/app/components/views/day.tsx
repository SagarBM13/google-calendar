import React, { useState } from 'react';
import moment from 'moment';
//import dayJson from '@/app/data/day-events.json';
import { Event } from '@/app/interfaces/event';
import { useDate } from '@/app/context/date-provider';
import CreateEvent from '@/app/components/create-event';
// JSON data for multiple people's events
//const events: Event[] = dayJson;

const Day: React.FC = () => {
    const { selectedDate, goToPreviousDay, goToNextDay } = useDate()
    const startOfDay = selectedDate.clone().startOf('day');
    const hours = [...Array(24)].map((_, i) => startOfDay.clone().add(i, 'hours'));
    const [currentSlot, setCurrentSlot] = useState<moment.Moment | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    const handleEventClick = (hour: moment.Moment) => {
        setCurrentSlot(hour);
        setModalOpen(true);
    };
    const getEventsForHour = (hour: moment.Moment) => {
        return events?.filter(event => moment(hour).format('hh:mm A') === event.time) || [];
    };
    const handleSaveEvent = (event: { person: string; title: string; time: string; date: string }) => {
        setEvents(prevEvents => [...prevEvents, event]);
        setModalOpen(false);
    };


    return (
        <div>
            {isModalOpen && <CreateEvent
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveEvent}
                initialData={{
                    person: '',
                    title: '',
                    time: currentSlot ? currentSlot.format('HH:mm') : '',
                    date: selectedDate.format('YYYY-MM-DD')
                }}
            />}
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousDay} className="px-4 py-2 bg-gray-300 rounded text-neutral-800">← Previous</button>
                <h2 className="text-lg font-semibold text-neutral-800">
                    {selectedDate.format('MMMM Do, YYYY')}
                </h2>
                <button onClick={goToNextDay} className="px-4 py-2 bg-gray-300 rounded text-neutral-800">Next →</button>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2 font-semibold">Time</div>
                <div className="col-span-10 font-semibold">Events</div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                {hours.map((hour, i) => (
                    <React.Fragment key={i}>
                        <div className="col-span-2 border p-2 rounded-lg bg-gray-100 text-neutral-800">
                            {hour.format('h:mm A')}
                        </div>
                        <div className="col-span-10 border p-2 rounded-lg">
                            <div className="grid grid-cols-3 gap-2">
                                {getEventsForHour(hour).length > 0 ? getEventsForHour(hour).map((event, j) => (
                                    <div key={j} className="border p-2 rounded-lg bg-blue-100 text-neutral-700">
                                        <strong>{event.person}:</strong> {event.title}
                                    </div>
                                )) : (
                                    <div
                                        className="border p-2 rounded-lg bg-blue-100 text-neutral-700"
                                        onClick={() => handleEventClick(hour)}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Day;
