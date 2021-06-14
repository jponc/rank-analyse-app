import { useWindowDimensions } from "react-native";

export const isLargeScreen = (): boolean => {
  const windowWidth = useWindowDimensions().width;
  return windowWidth >= 992;
}
