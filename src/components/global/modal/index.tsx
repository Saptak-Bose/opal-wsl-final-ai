import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type Props = {
  trigger: Readonly<ReactNode>;
  children: Readonly<ReactNode>;
  title: string;
  description: string;
  className?: string;
};

export default function Modal({
  children,
  description,
  title,
  trigger,
  className,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className={className} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="border-neutral-800/90">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
