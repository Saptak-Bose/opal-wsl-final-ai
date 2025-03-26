import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  icon: Readonly<ReactNode>;
  title: string;
  href: string;
  selected: boolean;
  notifications?: number;
};

export default function SidebarItem({
  href,
  icon,
  selected,
  title,
  notifications,
}: Props) {
  return (
    <li className="cursor-pointer my-[5px]">
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D]",
          selected ? "bg-[#1D1D1D]" : ""
        )}
      >
        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
          {icon}
          <span
            className={cn(
              "font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32",
              selected ? "text-[#9D9D9D]" : "text-[#545454]"
            )}
          >
            {title}
          </span>
        </div>
        <p
          className={cn(
            "font-medium group-hover:text-[#9D9D9D] transition-all mr-3",
            selected ? "text-[#9D9D9D]" : "text-[#545454]"
          )}
        >
          {title === "Notifications" ? notifications : null}
        </p>
      </Link>
    </li>
  );
}
