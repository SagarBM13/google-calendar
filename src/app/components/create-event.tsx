import React, { use, useState } from 'react';
import { EventProps } from '@/app/interfaces/event-props';

const CreateEvent: React.FC<EventProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [person, setPerson] = useState(initialData?.person || '');
    const [title, setTitle] = useState(initialData?.title || '');
    const [startTime, setStartTime] = useState(initialData?.startTime || '');
    const [endTime, setEndTime] = useState(initialData?.endTime || '');
    const [date, setDate] = useState(initialData?.date || '');

    const handleSave = () => {
        onSave({ person, title, startTime, endTime, date });
        onClose();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Create/Edit Event</h2>
                <label className="block mb-2">
                    Name:
                    <input
                        type="text"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </label>
                <label className="block mb-2">
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </label>
                <label className="block mb-2">
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </label>
                <label className="block mb-2">
                    Start Time:
                    <input
                        type="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </label>

                <label className="block mb-2">
                    End Time:
                    <input
                        type="startTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </label>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded text-neutral-800 mr-2">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
