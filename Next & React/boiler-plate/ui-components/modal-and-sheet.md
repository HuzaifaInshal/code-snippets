# Modal

/src/components/ui/modal.tsx

```tsx
"use client";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ open, onOpenChange, children, className }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50",
          "bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        )}
      />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)]",
          "outline -outline-offset-1 outline-brand-Text-100",
          "focus:outline-none",
          "duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",

          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const ModalClose = ({ className }: { className?: string }) => (
  <Dialog.Close
    className={cn(
      "rounded-lg p-1 text-brand-Text-400 hover:text-brand-Text-700 hover:bg-brand-Text-50 transition-colors",
      className
    )}
  >
    <X className="size-5" />
  </Dialog.Close>
);

export { Modal, ModalClose };
```

# Sheet

/src/components/ui/sheet.tsx

```tsx
"use client";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
};

const Sheet = ({
  open,
  onOpenChange,
  children,
  side = "right",
  className
}: SheetProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/40",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "duration-300"
        )}
      />
      <Dialog.Content
        className={cn(
          "fixed top-0 z-50 h-full bg-brand-base-white shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] flex flex-col focus:outline-none",
          side === "right" ? "right-0" : "left-0",
          side === "right"
            ? "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
            : "data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left",
          "duration-300 ease-in-out",
          "w-3/4",
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const SheetClose = ({ className }: { className?: string }) => (
  <Dialog.Close
    className={cn(
      "rounded-lg p-1 text-brand-Text-400 hover:text-brand-Text-700 hover:bg-brand-Text-50 transition-colors",
      className
    )}
  >
    <X className="size-5" />
  </Dialog.Close>
);

export { Sheet, SheetClose };
```

For both modal and sheet must use Dialog.Title
