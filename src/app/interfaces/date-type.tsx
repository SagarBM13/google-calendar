
import moment from 'moment';
export interface DateContextType {
    selectedDate: moment.Moment;
    setSelectedDate: (date: moment.Moment) => void;
    goToPreviousDay: () => void;
    goToNextDay: () => void;
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
}