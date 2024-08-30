
import React, { createContext, useState, useContext, ReactNode } from 'react';
import moment from 'moment';
import { DateContextType } from '@/app/interfaces/date-type';


const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(moment());

    const goToPreviousDay = () => {
        setSelectedDate(prevDate => prevDate.clone().subtract(1, 'day'));
    };

    const goToNextDay = () => {
        setSelectedDate(prevDate => prevDate.clone().add(1, 'day'));
    };

    const goToPreviousWeek = () => {
        setSelectedDate(prevWeek => prevWeek.clone().subtract(1, 'week'));
    };

    const goToNextWeek = () => {
        setSelectedDate(prevWeek => prevWeek.clone().add(1, 'week'));
    };

    const goToPreviousMonth = () => {
        setSelectedDate(prevMonth => prevMonth.clone().subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setSelectedDate(prevMonth => prevMonth.clone().add(1, 'month'));
    };

    return (
        <DateContext.Provider value={{
            selectedDate,
            setSelectedDate,
            goToPreviousDay,
            goToNextDay,
            goToPreviousWeek,
            goToNextWeek,
            goToPreviousMonth,
            goToNextMonth
        }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = (): DateContextType => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDate must be used within a DateProvider');
    }
    return context;
};
