
import moment from 'moment';
export interface DateContextType {
    selectedDate: moment.Moment;
    setSelectedDate: (date: moment.Moment) => void;
    goToPreviousDay: () => void;
    goToNextDay: () => void;
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
    goToPreviousYear: () => void;
    goToNextYear: () => void;
    resetToToday: () => void;
    handleDateClick: (date: moment.Moment) => void;
}