import React, { useState, useCallback, useMemo } from 'react';
import moment from 'moment';
import { Event } from '@/app/interfaces/event';
import { useDate } from '@/app/context/date-provider';
import CreateEvent from '@/app/components/create-event';
import dayJson from '@/app/data/day-events.json';

const SLOT_HEIGHT_IN_PIXELS: number = 80;
const SLOT_HEIGHT_IN_MINUTES: number = 30;
const PIXEL_PER_MINUTE: number = SLOT_HEIGHT_IN_PIXELS / SLOT_HEIGHT_IN_MINUTES;
const MIN_EVENT_HEIGHT: number = 20; // Minimum event height in pixels for short events.

const Day: React.FC = () => {
    const { selectedDate, goToPreviousDay, goToNextDay } = useDate();
    const startOfDay = selectedDate.clone().startOf('day');
    const slots = useMemo(
        () => [...Array(48)].map((_, i) => startOfDay.clone().add(i * 30, 'minutes')),
        [startOfDay]
    );
    const [currentSlot, setCurrentSlot] = useState<moment.Moment | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>(dayJson);
    const currentTime = moment();

    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => {
            const aStart = moment(a.startTime, 'hh:mm A');
            const bStart = moment(b.startTime, 'hh:mm A');
            return aStart.diff(bStart);
        });
    }, [events]);

    const getOverlappingEvents = useCallback((event: Event, sortedEvents: Event[]) => {
        const eventStart = moment(event.startTime, 'hh:mm A');
        const eventEnd = moment(event.endTime, 'hh:mm A');
        return sortedEvents.filter(e => {
            const eStart = moment(e.startTime, 'hh:mm A');
            const eEnd = moment(e.endTime, 'hh:mm A');
            return (eStart.isBefore(eventEnd) && eEnd.isAfter(eventStart));
        });
    }, []);

    const getEventWidthAndPosition = useCallback((event: Event, sortedEvents: Event[]) => {
        const overlappingEvents = getOverlappingEvents(event, sortedEvents);
        const totalOverlaps = overlappingEvents.length;
        const eventIndex = overlappingEvents.findIndex(e => e === event);
        const eventWidth = 92 / totalOverlaps; // Using 92% to leave some margin
        const eventLeftPosition = (eventIndex * eventWidth) + 6; // 4% left margin
        return { eventWidth, eventLeftPosition };
    }, [getOverlappingEvents]);

    const getCurrentTimePosition = () => {
        const minutesFromStart = currentTime.diff(startOfDay, 'minutes');
        return minutesFromStart * PIXEL_PER_MINUTE;
    };

    const handleEventClick = (e: React.MouseEvent, hour: moment.Moment) => {
        const clickPositionY = e.nativeEvent.offsetY;
        const minutesInSlot = (clickPositionY / SLOT_HEIGHT_IN_PIXELS) * SLOT_HEIGHT_IN_MINUTES;
        const clickedTime = hour.clone().add(minutesInSlot, 'minutes');
        setCurrentSlot(clickedTime);
        setModalOpen(true);
    };

    const handleSaveEvent = (event: Event) => {
        const formattedEvent = {
            ...event,
            startTime: moment(event.startTime, 'HH:mm').format('hh:mm A'),
            endTime: moment(event.endTime, 'HH:mm').format('hh:mm A'),
        };
        setEvents(prevEvents => [...prevEvents, formattedEvent]);
        setModalOpen(false);
    };

    const getDefaultEndTime = (startTime: moment.Moment) => {
        return startTime.clone().add(30, 'minutes').format('HH:mm');
    };

    const defaultEndTime = currentSlot
        ? getDefaultEndTime(currentSlot)
        : getDefaultEndTime(currentTime);

    const calculateEventPosition = (event: Event) => {
        const eventStart = moment(event.startTime, 'hh:mm A');
        const minutesFromStart = eventStart.diff(startOfDay, 'minutes');
        return minutesFromStart * PIXEL_PER_MINUTE;
    };

    const calculateEventHeight = (event: Event) => {
        const eventStart = moment(event.startTime, 'hh:mm A');
        const eventEnd = moment(event.endTime, 'hh:mm A');
        const durationMinutes = eventEnd.diff(eventStart, 'minutes');
        return Math.max(durationMinutes * PIXEL_PER_MINUTE, MIN_EVENT_HEIGHT); // Ensure minimum height
    };

    const renderEvent = useCallback((event: Event) => {
        const { eventWidth, eventLeftPosition } = getEventWidthAndPosition(event, sortedEvents);
        const eventTop = calculateEventPosition(event);
        const eventHeight = calculateEventHeight(event);
        const durationMinutes = moment(event.endTime, 'hh:mm A').diff(moment(event.startTime, 'hh:mm A'), 'minutes');


        return (
            <div
                key={`${event.id}-${event.startTime}`}
                className="absolute border-l-4 pl-2 pr-1 cursor-pointer rounded-lg text-neutral-700 flex flex-col pt-1 overflow-hidden transition-all duration-200 hover:scale-105 hover:z-10"
                style={{
                    top: `${eventTop}px`,
                    height: `${eventHeight}px`,
                    width: `${eventWidth}%`,
                    left: `${eventLeftPosition}%`,
                    backgroundColor: '#E2E8F0',
                    borderColor: '#94A3B8',
                    minHeight: MIN_EVENT_HEIGHT,
                }}
                onClick={() => setModalOpen(true)}
            >
                {durationMinutes >= 15 && ( // Show details only if event is longer than 15 minutes
                    <>
                        <div className="text-sm truncate">{event.person}</div>
                        <div className="text-xs">{event.startTime} - {event.endTime}</div>
                    </>
                )}
                {durationMinutes < 15 && (
                    <div className="absolute bg-gray-700 text-white text-xs rounded px-2 py-1 shadow-lg top-6 left-0 z-20 hidden group-hover:block">
                        <div className="font-semibold">{event.person}</div>
                        <div className="text-xs">{event.title}</div>
                        <div>{event.startTime} - {event.endTime}</div>
                    </div>
                )}
            </div>
        );
    }, [getEventWidthAndPosition, sortedEvents]);

    return (
        <div className="relative">
            {isModalOpen && (
                <CreateEvent
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveEvent}
                    initialData={{
                        person: '',
                        title: '',
                        startTime: currentSlot ? currentSlot.format('HH:mm') : '',
                        endTime: defaultEndTime,
                    }}
                />
            )}
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
            <div className="grid grid-cols-12 mt-2 relative">
                {slots.map((hour, i) => (
                    <React.Fragment key={`slot-${i}`}>
                        <div className="rounded-lg text-xs pt-2 text-gray-500 pl-4">
                            {hour.format('h:mm A')}
                        </div>
                        <div className="col-span-11 border-t h-20 w-full">
                            <div
                                className="relative h-full w-full cursor-pointer"
                                onClick={(e) => handleEventClick(e, hour)}
                            ></div>
                        </div>
                    </React.Fragment>
                ))}
                {sortedEvents.map(renderEvent)}
                <div
                    className="absolute bg-red-500 w-full"
                    style={{
                        top: getCurrentTimePosition(),
                        height: '2px',
                    }}
                />
            </div>
        </div>
    );
};

export default Day;
