import { ChangeEvent, useEffect, useState } from "react";
import { useQueryData } from "./use-query-data";
import { searchUsers } from "@/actions/user";

export const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);

        if (users.status === 200) return setOnUsers(users.data);
      }
    },
    false
  );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      debounce;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  return {
    onSearchQuery,
    query,
    isFetching,
    onUsers,
  };
};
