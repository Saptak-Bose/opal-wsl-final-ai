import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  options?: {
    value: string;
    label: string;
    id: string;
  }[];
  label?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
};

export default function FormGenerator({
  errors,
  inputType,
  label,
  lines,
  name,
  options,
  placeholder,
  register,
  type,
}: Props) {
  switch (inputType) {
    case "input":
      return (
        <Label
          htmlFor={`input-${label}`}
          className="flex flex-col gap-2 text-[#9D9D9D] items-start"
        >
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className="!bg-transparent border-themeGray text-themeGray border-neutral-800/90 focus-visible:border-neutral-800/90 focus-visible:ring-0"
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label htmlFor={`select-${label}`} className="flex flex-col gap-2">
          {label && label}
          <select
            id={`select-${label}`}
            className="w-full bg-transparent border p-3 rounded-lg"
            {...register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-muted"
                >
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "textarea":
      return (
        <Label htmlFor={`input-${label}`} className="flex flex-col gap-2">
          {label && label}
          <Textarea
            className="!bg-transparent border-themeGray text-themeGray"
            id={`input-${label}`}
            placeholder={placeholder}
            rows={lines}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
  }
}
