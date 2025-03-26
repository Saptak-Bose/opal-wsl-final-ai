import { useCreateWorkspace } from "@/hooks/use-create-workspace";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loader";

type Props = object;

export default function WorkspaceForm({}: Props) {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        register={register}
        name="name"
        placeholder="Workspace Name"
        label="Name"
        errors={errors}
        inputType="input"
        type="text"
      />
      <Button
        className="text-sm cursor-pointer w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
}
