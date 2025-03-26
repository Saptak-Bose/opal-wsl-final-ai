"use client";

import { getWorkSpaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/use-query-data";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import WorkspaceForm from "@/components/forms/workspace-form";

type Props = object;

export default function CreateWorkspace({}: Props) {
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: plan } = data as PlanProps;

  if (plan.subscription?.plan === "FREE") return <></>;

  if (plan.subscription?.plan === "PRO")
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces help you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl cursor-pointer">
            <FolderPlusDuotine />
            Create a Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
}
