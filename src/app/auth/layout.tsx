import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="container h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
