export interface EventProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: { person: string; title: string; time: string; date: string }) => void;
    initialData?: { person: string; title: string; time: string; date: string };
}
