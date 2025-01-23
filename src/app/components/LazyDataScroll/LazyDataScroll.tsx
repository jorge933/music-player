import { useEffect, useRef, useState } from "react";
import { LazyDataScrollProps } from "./LazyDataScroll.types";
import { ScrollView } from "react-native";
import { NativeSyntheticEvent } from "react-native";
import { NativeScrollEvent } from "react-native";

export function LazyDataScroll({
  getData,
  render,
  limit = 10,
  style,
}: LazyDataScrollProps) {
  const currentRange = useRef(0);
  const [data, setData] = useState<unknown[]>([]);
  const [gotAllTheData, setGotAllTheData] = useState(false);

  const getDataAndUpdate = () => {
    const newRange = getData(currentRange.current, limit);

    if (newRange.length >= 1) {
      setData([...data, ...newRange]);
      currentRange.current += limit;
    } else {
      setGotAllTheData(true);
    }
  };

  useEffect(() => {
    getDataAndUpdate();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (gotAllTheData) return;

    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const available = contentSize.height - layoutMeasurement.height;
    const scrolled = contentOffset.y / available;
    const scrollPercentage = Math.min(scrolled * 100, 100);

    if (scrollPercentage > 42) {
      getDataAndUpdate();
    }
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={40} style={style}>
      {data.map((item) => render(item))}
    </ScrollView>
  );
}
