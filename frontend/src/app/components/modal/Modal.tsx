import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'components/ui/dialog';

interface ModalProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const Modal = (props: ModalProps) => {
    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            {props.children}
        </Dialog>
    );
};

export default Modal;

interface ModalContentProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const ModalContent = (props: ModalContentProps) => {
    return (
        <DialogContent>
            <DialogHeader>
                {props.title && <DialogTitle>{props.title}</DialogTitle>}
                {props.description && (
                    <DialogDescription>{props.description}</DialogDescription>
                )}
            </DialogHeader>
            {props.children}
        </DialogContent>
    );
};

Modal.Action = DialogTrigger;
Modal.Footer = DialogFooter;
Modal.Title = DialogTitle;
Modal.Description = DialogDescription;
Modal.Content = ModalContent;
