export interface EventProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: { person: string; title: string; startTime: string; endTime: string; }) => void;
    initialData?: { person: string; title: string; startTime: string; endTime: string; };
}
