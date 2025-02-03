import { useCallback, useEffect, useRef, useState } from "react";

export function useLazyLoadData<T>(
  getData: (start: number, limit: number) => T[],
  limit: number,
  dependencies: any[],
) {
  const currentRange = useRef(0);
  const [data, setData] = useState<T[]>([]);
  const [gotAllTheData, setGotAllTheData] = useState(false);

  const getDataAndUpdate = useCallback(() => {
    if (gotAllTheData) return;

    const newRange = getData(currentRange.current, limit);

    if (newRange.length >= 1) {
      setData((prevData) => [...prevData, ...newRange]);
    } else {
      setGotAllTheData(true);
    }
    currentRange.current += limit;
  }, [gotAllTheData, getData]);

  useEffect(() => {
    const currentData = getData(0, currentRange.current);

    setData(currentData);
  }, [dependencies]);

  useEffect(() => {
    getDataAndUpdate();
  }, []);

  return { data, getDataAndUpdate };
}
