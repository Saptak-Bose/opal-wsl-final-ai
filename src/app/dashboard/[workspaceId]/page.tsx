import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: {
    workspaceId: string;
  };
};

export default function WorkSpaceIdPage({ params: { workspaceId } }: Props) {
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="!bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="px-6 py-5 rounded-full dark:data-[state=active]:bg-neutral-800/90 dark:data-[state=active]:border-neutral-800/90 cursor-pointer"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="px-6 py-5 rounded-full dark:data-[state=active]:bg-neutral-800/90 dark:data-[state=active]:border-neutral-800/90 cursor-pointer"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkspace />
          </div>
        </div>
      </Tabs>
    </div>
  );
}
