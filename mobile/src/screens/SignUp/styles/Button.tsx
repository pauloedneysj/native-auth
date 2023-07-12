import { styled } from "styled-components/native";
import { ActivityIndicator } from "react-native";

import { getFontSize } from "../../../utils/functions";

interface AuthButtonsProps {
  onSignIn: () => void;
  isLoading: boolean;
}

const SignInButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 10%;
  border-radius: 16px;
  opacity: 0.8;
  background-color: #55c2da;
  margin-top: 2%;
`;

const SignInButtonText = styled.Text`
  font-family: Poppins;
  font-size: ${getFontSize(17)}px;
  font-style: normal;
  font-weight: 700;
  color: #111111;
`;

export default function AuthButtons({ onSignIn, isLoading }: AuthButtonsProps) {
  return (
    <SignInButton onPress={onSignIn} activeOpacity={0.7}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SignInButtonText>Confirmar</SignInButtonText>
      )}
    </SignInButton>
  );
}
