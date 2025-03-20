import { ReactNode } from "react";
import LandingPageNavbar from "./_components/navbar";

export default function WebsiteLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="flex flex-col py-10 px-10 xl:px-0 container">
      <LandingPageNavbar />
      {children}
    </div>
  );
}
