import {
  MutationFunction,
  MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) return onSuccess();

      return toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.data,
      });
    },
    onSettled: async () =>
      await client.invalidateQueries({ queryKey: [queryKey] }),
  });

  return {
    mutate,
    isPending,
  };
};
