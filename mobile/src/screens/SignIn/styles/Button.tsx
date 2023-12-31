import { styled } from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getFontSize, storage } from "../../../utils/functions";
import useKeyboardDetect from "../../../hooks/useKeyboardDetect";

interface AuthButtonsProps {
  onSignIn: () => void;
  isLoading: boolean;
  isKeyboardOpen: boolean;
}

const Button = styled.TouchableOpacity<{ isKeyboardOpen: boolean }>`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: ${(props) => (props.isKeyboardOpen ? "16%" : "10%")};
  border-radius: 16px;
  opacity: 0.8;
  background-color: #55c2da;
  margin-bottom: 8%;
`;

const ButtonText = styled.Text`
  font-family: Poppins;
  font-size: ${getFontSize(17)}px;
  font-style: normal;
  font-weight: 700;
  color: #0e1111;
`;

export default function SignInButton({
  onSignIn,
  isLoading,
}: AuthButtonsProps) {
  const isBiometricActive = storage.getBoolean("is-biometric-active");
  const isKeyboardOpen = useKeyboardDetect();

  return (
    <Button
      onPress={onSignIn}
      activeOpacity={0.7}
      isKeyboardOpen={isKeyboardOpen}
    >
      {isLoading ? (
        <ActivityIndicator color="#0e1111" />
      ) : isBiometricActive ? (
        <Ionicons name="finger-print-outline" size={36} color="#0e1111" />
      ) : (
        <ButtonText>Entrar</ButtonText>
      )}
    </Button>
  );
}
