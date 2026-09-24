import { useState } from "react";

export const useFetch = <TArg, TResult>(callback: (arg: TArg) => Promise<TResult>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFn = async (arg: TArg): Promise<TResult | undefined> => {
    try {
      setIsLoading(true);
      setError("");
      const response = await callback(arg);

      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error] as const;
};
