import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(options: AxiosRequestConfig): {
  data: T | null;
  isFetching: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .request<T>(options)
      .then(({ data: result }) => {
        if (!data) setData(result);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return { data, isFetching };
}
