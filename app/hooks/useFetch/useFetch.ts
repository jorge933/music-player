import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { UseFetchReturn } from "./useFetch.types";

export function useFetch<T>(options: AxiosRequestConfig): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>();
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = useCallback(() => {
    setIsFetching(true);
    setError(null);
    setData(null);

    axios
      .request<T>(options)
      .then(({ data: result }) => {
        setData(result);
        if (error) setError(null);
      })
      .catch(setError)
      .finally(() => setIsFetching(false));
  }, [options]);

  return { data, error, isFetching, fetchData };
}
