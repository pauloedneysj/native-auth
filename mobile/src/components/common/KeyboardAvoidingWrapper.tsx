import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface KeyboardAvoidingWrapperProps {
  children: React.ReactNode;
}

export default function KeyboardAvoidingWrapper({
  children,
}: KeyboardAvoidingWrapperProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
