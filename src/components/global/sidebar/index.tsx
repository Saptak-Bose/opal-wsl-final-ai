"use client";

import { getWorkSpaces } from "@/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/use-query-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Search from "../search";

type Props = {
  activeWorkspaceId: string;
};

export default function Sidebar({ activeWorkspaceId }: Props) {
  const router = useRouter();
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workspace } = data as WorkspaceProps;

  const onChangeActiveWorkspace = (value: string) =>
    router.push(`/dashboard/${value}`);

  const currentWorkspace = workspace.workSpace.find(
    (w) => w.id === activeWorkspaceId
  );

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 text-3xl font-semibold gap-x-3">
        <Image src="/opal-logo.svg" width={40} height={40} alt="Logo" />
        <p>Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 !text-neutral-400 !bg-transparent w-full cursor-pointer border-neutral-800/90">
          <SelectValue placeholder="Select a Workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl border-neutral-800/90">
          <SelectGroup>
            <SelectLabel className="text-sm text-primary font-extrabold">
              Workspaces
            </SelectLabel>
            <Separator className="bg-neutral-800/90 mb-0.5" />
            {workspace.workSpace.map((workspace) => (
              <SelectItem
                key={workspace.id}
                value={workspace.id}
                className="text-sm font-semibold cursor-pointer hover:bg-neutral-800/60"
              >
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
      workspace.subscription?.plan === "PRO" ? (
        <Modal
          trigger={
            <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
              <PlusCircle
                size={15}
                className="text-neutral-800/90 fill-neutral-500"
              />
              <span className="text-neutral-400 font-semibold text-xs">
                Invite to Workspace
              </span>
            </span>
          }
          title="Invite to Workspace"
          description="Invite other users to your workspace."
        >
          <Search workspaceId={activeWorkspaceId} />
        </Modal>
      ) : null}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul></ul>
      </nav>
    </div>
  );
}
