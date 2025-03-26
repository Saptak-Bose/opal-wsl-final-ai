import { ReactNode } from "react";

type Props = {
  children: Readonly<ReactNode>;
};

export default function WorkspacePlaceholder({ children }: Props) {
  return (
    <span className="bg-[#545454] flex items-center font-bold justify-center w-8 px-2 h-7 rounded-sm text-[#1D1D1D]">
      {children}
    </span>
  );
}
