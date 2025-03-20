import Spinner from "@/components/global/loader/spinner";

type Props = object;

export default function AuthLoading({}: Props) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
