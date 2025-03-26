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
import { usePathname, useRouter } from "next/navigation";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import WorkspacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";
import Infobar from "../info-bar";

type Props = {
  activeWorkspaceId: string;
};

export default function Sidebar({ activeWorkspaceId }: Props) {
  // WIP: Add the upgrade button
  const router = useRouter();
  const pathName = usePathname();
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workspace } = data as WorkspaceProps;
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: count } = notifications as NotificationProps;
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const onChangeActiveWorkspace = (value: string) =>
    router.push(`/dashboard/${value}`);

  const currentWorkspace = workspace.workSpace.find(
    (w) => w.id === activeWorkspaceId
  );

  const SidebarSection = (
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
      <p className="w-full text-[#9D9D9D] font-bold mt-4 ml-3">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5 bg-neutral-800/90" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4 ml-3">Workspaces</p>
      {workspace.workSpace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px] ml-3">
          <p className="text-[#3C3C3C] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces..."
              : "No workspaces..."}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workSpace.length > 0 &&
            workspace.workSpace.map(
              (workspace) =>
                workspace.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${workspace.id}`}
                    selected={pathName === `/dashboard/${workspace.id}`}
                    title={workspace.name}
                    notifications={0}
                    key={workspace.name}
                    icon={
                      <WorkspacePlaceholder>
                        {workspace.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((member) => (
              <SidebarItem
                href={`/dashboard/${member.WorkSpace.id}`}
                selected={pathName === `/dashboard/${member.WorkSpace.id}`}
                title={member.WorkSpace.name}
                notifications={0}
                key={member.WorkSpace.name}
                icon={
                  <WorkspacePlaceholder>
                    {member.WorkSpace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5 bg-neutral-800/90" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button className="text-sm w-full mt-2 cursor-pointer">
              <Loader color="#000" state={false}>
                Upgrade
              </Loader>
            </Button>
          }
        />
      )}
    </div>
  );

  return (
    <div className="full">
      <Infobar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant="ghost" className="mt-0.5 cursor-pointer">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-fit h-full border-r-neutral-800/90"
          >
            <VisuallyHidden>
              <DialogTitle>Sidebar</DialogTitle>
            </VisuallyHidden>
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
}
