import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

export default function BackgroundLinearGradient({ children }: any) {
  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.75, y: 0.5 }}
      colors={["#8e9eab", "#eef2f3"]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingWrapper>{children}</KeyboardAvoidingWrapper>
    </LinearGradient>
  );
}
