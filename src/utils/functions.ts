import { MMKV } from "react-native-mmkv";
import { Dimensions, PixelRatio } from "react-native";
import Constants from "expo-constants";

export const storage = new MMKV();

export const ScreenHeight = Dimensions.get("window").height;

export const StatusBarHeight = Constants.statusBarHeight;

export const fontScale = PixelRatio.getFontScale();

export function getFontSize(size: number) {
  return size / fontScale;
}
