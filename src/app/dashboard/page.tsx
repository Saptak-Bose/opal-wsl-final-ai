import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = object;

export default async function DashboardPage({}: Props) {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workSpace[0].id}`);

  if (
    auth.status === 400 ||
    auth.status === 404 ||
    auth.status === 403 ||
    auth.status === 401 ||
    auth.status === 500
  )
    return redirect("/auth/sign-in");
}
