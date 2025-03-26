import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = (
  schema: z.ZodSchema,
  mutation: UseMutateFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: any
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }));

  return {
    register,
    watch,
    reset,
    errors,
    onFormSubmit,
  };
};
