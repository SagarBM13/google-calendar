import React, { useState } from 'react';
import moment from 'moment';
import dayJson from '@/app/data/day-events.json';
import { Event } from '@/app/interfaces/event';
import { useDate } from '@/app/context/date-provider';
import CreateEvent from '@/app/components/create-event';
const SLOT_HEIGHT_IN_PIXELS: number = 80;
const SLOT_HEIGHT_IN_MINUTES: number = 30;
const PIXEL_PER_MINUTE: number = SLOT_HEIGHT_IN_PIXELS / SLOT_HEIGHT_IN_MINUTES;
// JSON data for multiple people's events
//const events: Event[] = dayJson;

const Day: React.FC = () => {
    const { selectedDate, goToPreviousDay, goToNextDay } = useDate()
    const startOfDay = selectedDate.clone().startOf('day');
    const slots = [...Array(48)].map((_, i) =>
        startOfDay.clone().add(i * 30, 'minutes')
    );
    const [currentSlot, setCurrentSlot] = useState<moment.Moment | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>(dayJson);
    const currentTime = moment();

    const getCurrentTimePosition = () => {
        const minutesFromStart = currentTime.diff(startOfDay, 'minutes');
        console.log("---", minutesFromStart, minutesFromStart * PIXEL_PER_MINUTE)
        return minutesFromStart * PIXEL_PER_MINUTE;
    };
    const handleEventClick = (e: React.MouseEvent, hour: moment.Moment) => {
        const clickPositionY = e.nativeEvent.offsetY;
        const minutesInSlot =
            (clickPositionY / SLOT_HEIGHT_IN_PIXELS) * SLOT_HEIGHT_IN_MINUTES;
        const clickedTime = hour.clone().add(minutesInSlot, 'minutes');
        setCurrentSlot(clickedTime);
        setModalOpen(true);
    };


    const getEventSpan = (event: any) => {
        const eventStart = moment(event?.startTime, 'hh:mm A');
        const eventEnd = moment(event?.endTime, 'hh:mm A');
        const duration = moment.duration(eventEnd.diff(eventStart));
        return duration.asMinutes();
    };

    const getEventsForSlot = (slot: moment.Moment) => {
        return (
            events?.filter((event: any) => {
                const eventStart = moment(event?.startTime, 'hh:mm A');
                return (
                    slot.isSameOrBefore(eventStart) &&
                    slot.clone().add(30, 'minutes').isAfter(eventStart)
                );
            }) || []
        );
    };

    const handleSaveEvent = (event: {
        person: string;
        title: string;
        startTime: string;
        endTime: string;
    }) => {
        const formattedEvent = {
            ...event,
            startTime: moment(event.startTime, 'HH:mm').format('hh:mm A'),
            endTime: moment(event.endTime, 'HH:mm').format('hh:mm A'),
        };
        setEvents((prevEvents) => [...prevEvents, formattedEvent]);
        setModalOpen(false);
    };



    const getDefaultEndTime = (startTime: moment.Moment) => {
        return startTime.clone().add(30, 'minutes').format('HH:mm');
    };

    const defaultEndTime = currentSlot
        ? getDefaultEndTime(currentSlot)
        : getDefaultEndTime(currentTime);

    const calculateEventPosition = (event: any, hour: moment.Moment) => {
        const eventStart = moment(event?.startTime, 'hh:mm A');
        const minutesFromStart = eventStart.diff(hour, 'minutes');
        return minutesFromStart * PIXEL_PER_MINUTE;
    };

    const calculateEventHeight = (event: any) => {
        const durationMinutes = getEventSpan(event);
        return durationMinutes * PIXEL_PER_MINUTE;
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
                    startTime: currentSlot ? currentSlot.format('HH:mm') : '',
                    endTime: defaultEndTime,
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
                {slots.map((hour, i) => (
                    <React.Fragment key={'slot' + i}>
                        <div className="rounded-lg text-xs pt-2 text-gray-500 pl-4">
                            {hour.format('h:mm A')}
                        </div>
                        <div className="col-span-11 border-t h-20 w-full">
                            <div className="relative h-full">
                                {getEventsForSlot(hour).length > 0 ? getEventsForSlot(hour).map((event, j) => (
                                    <div key={event.toString() + j}>
                                        <div
                                            className="w-full cursor-pointer p-2 rounded-lg h-20"
                                            onClick={(e) =>
                                                handleEventClick(e, hour)
                                            }
                                        ></div>
                                        <div
                                            className="absolute border-l-4 pl-5 pr-3 cursor-pointer w-[98%] left-0 border-pink-300 rounded-lg bg-slate-400 text-neutral-700 flex flex-col pt-2"
                                            style={{
                                                top: `${calculateEventPosition(event, hour)}px`,
                                                height: `${calculateEventHeight(event)}px`,
                                                zIndex: 2,
                                            }}
                                            onClick={(e) =>
                                                handleEventClick(
                                                    e,
                                                    moment(
                                                        event?.startTime,
                                                        'hh:mm A'
                                                    )
                                                )
                                            }
                                        >
                                            <div className="flex items-center gap-x-2 relative">
                                                <div className="text-primary-900 font-semibold">
                                                    {event?.person}
                                                </div>
                                                <div className="text-primary-700">{event?.title}</div>
                                            </div>
                                            <div className="mt-1">
                                                <div className="text-primary-700 mt-1">
                                                    {event?.startTime} -{' '}
                                                    {event?.endTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div
                                        className="w-full cursor-pointer p-2 rounded-lg h-20"
                                        onClick={(e) => handleEventClick(e, hour)}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
                <div
                    className="absolute bg-red-500 w-full"
                    style={{
                        top: getCurrentTimePosition(),
                        height: '2px',
                        zIndex: 1,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Day;
