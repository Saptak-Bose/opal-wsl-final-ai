import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/use-mutation-data";
import { useSearch } from "@/hooks/use-search";
import { User } from "lucide-react";
import Loader from "../loader";

type Props = {
  workspaceId: string;
};

export default function Search({ workspaceId }: Props) {
  const { isFetching, onSearchQuery, onUsers, query } = useSearch(
    "get-users",
    "USERS"
  );

  // WIP: Wire up sending invitations
  // const { isPending, mutate } = useMutationData(
  //   ["invite-member"],
  //   (data: { receiverId: string; email: string }) => {

  //   }
  // );

  return (
    <div className="flex flex-col gap-y-5">
      <Input
        onChange={onSearchQuery}
        value={query}
        className="!bg-transparent border-2 outline-none border-neutral-800/90"
        placeholder="Search for users..."
        type="text"
      />
      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : !onUsers ? (
        <p className="text-sm text-center text-[#A4A4A4]">No users found...</p>
      ) : (
        <div>
          {onUsers?.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl border-neutral-800/90"
            >
              <Avatar>
                <AvatarImage src={user.image as string} />
                <AvatarFallback className="border-2 border-neutral-800/90">
                  <User className="p-0.5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1E1E1E]">
                  {user.subscription?.plan}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <Button
                  onClick={() => {}}
                  variant="default"
                  className="w-5/12 font-extrabold cursor-pointer"
                >
                  <Loader state={false} color="#000">
                    Invite
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
