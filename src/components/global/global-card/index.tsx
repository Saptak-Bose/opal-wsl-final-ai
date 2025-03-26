import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children?: Readonly<ReactNode>;
  footer?: Readonly<ReactNode>;
};

export default function GlobalCard({
  children,
  description,
  title,
  footer,
}: Props) {
  return (
    <Card className="!bg-transparent mt-4 border-neutral-800/90 w-full">
      <CardHeader className="px-4">
        <CardTitle className="text-base text-[#9D9D9D]">{title}</CardTitle>
        <CardDescription className="text-[#707070]">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <div className="px-4">{children}</div>}
      {footer && <CardFooter className="px-4">{footer}</CardFooter>}
    </Card>
  );
}
