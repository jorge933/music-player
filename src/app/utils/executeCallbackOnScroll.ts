import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export function executeCallbackOnScroll(
  callback: () => void,
  scrollPercentageToCall: number = 50,
) {
  return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const available = contentSize.height - layoutMeasurement.height;
    const scrolled = contentOffset.y / available;
    const scrollPercentage = Math.min(scrolled * 100, 100);

    if (scrollPercentage > scrollPercentageToCall) {
      callback();
    }
  };
}
