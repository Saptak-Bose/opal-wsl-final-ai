import { onAuthenticateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = object;

export default async function LandingPageNavbar({}: Props) {
  const auth = await onAuthenticateUser();

  return (
    <nav className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="h-8 w-8 lg:hidden" />
        <Image src="/opal-logo.svg" width={40} height={40} alt="Logo" />
        Opal
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/"
          className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
        >
          Home
        </Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#contact">Contact</Link>
      </div>
      <div className="flex gap-x-5 items-center">
        <Link href="/auth/sign-in">
          <Button className="text-base flex gap-x-2 cursor-pointer">
            {!auth ? (
              <>
                <User fill="#000" />
                Sign In
              </>
            ) : (
              <>
                <LayoutDashboard fill="#000" />
                Dashboard
              </>
            )}
          </Button>
        </Link>
        {auth ? <UserButton /> : null}
      </div>
    </nav>
  );
}
