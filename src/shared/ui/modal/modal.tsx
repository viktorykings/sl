'use client';
import { createContext, useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalContextType {
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const ModalRoot: React.FC<ModalProps> = ({ children, open, onOpenChange, className }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <ModalContext.Provider value={{ setOpen: handleOpenChange }}>
      <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
        <div className={cn('modal-wrapper', className)}>{children}</div>
      </Dialog>
    </ModalContext.Provider>
  );
};

interface ModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({ children, asChild, className }) => {
  return (
    <DialogTrigger asChild={asChild} className={cn('modal-trigger', className)}>
      {children}
    </DialogTrigger>
  );
};

interface ModalContentProps {
  children: (props: { close: () => void }) => React.ReactNode;
  className?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ children, className }) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalContent must be used within a Modal');
  }
  const { setOpen } = context;
  const close = () => setOpen(false);

  return (
    <DialogContent className={cn('modal-content', className)}>{children({ close })}</DialogContent>
  );
};

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  return <DialogHeader className={cn('modal-header', className)}>{children}</DialogHeader>;
};

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className }) => {
  return <DialogTitle className={cn('modal-title', className)}>{children}</DialogTitle>;
};

interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({ children, className }) => {
  return (
    <DialogDescription className={cn('modal-description', className)}>{children}</DialogDescription>
  );
};

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return <DialogFooter className={cn('modal-footer', className)}>{children}</DialogFooter>;
};

interface ModalCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const ModalClose: React.FC<ModalCloseProps> = ({ children, asChild, className }) => {
  return (
    <DialogClose asChild={asChild} className={cn('modal-close cursor-pointer', className)}>
      {children}
    </DialogClose>
  );
};

interface ModalComponent extends React.FC<ModalProps> {
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Footer: typeof ModalFooter;
  Close: typeof ModalClose;
}

const Modal = ModalRoot as ModalComponent;
Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;
Modal.Close = ModalClose;

export default Modal;
