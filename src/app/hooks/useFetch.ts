import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(options: AxiosRequestConfig): {
  data: T | null;
  error: unknown;
  isFetching: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>();
  const [isFetching, setIsFetching] = useState(true);

  if (!options.timeout) options.timeout = 10000;

  useEffect(() => {
    axios
      .request<T>(options)
      .then(({ data: result }) => {
        if (!data) setData(result);
      })
      .catch(setError)
      .finally(() => setIsFetching(false));
  }, []);

  return { data, error, isFetching };
}
