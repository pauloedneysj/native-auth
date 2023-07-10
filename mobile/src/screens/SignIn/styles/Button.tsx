import { styled } from "styled-components/native";
import { ActivityIndicator } from "react-native";

import { getFontSize } from "../../../utils/functions";

interface AuthButtonsProps {
  onSignIn: () => void;
  toRegister: () => void;
  toRecoveryPassword: () => void;
  isLoading: boolean;
}

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 20%;
  margin: 4% 0 4% 0;
`;

const RecoveryPasswordText = styled.Text`
  margin-bottom: 2.5%;
  font-family: Poppins;
  font-size: ${getFontSize(14)}px;
  font-style: normal;
  font-weight: 700;
  color: #696969;
`;

const SignInButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  margin-bottom: 2.5%;
  border-radius: 16px;
  opacity: 0.8;
  background-color: #55c2da;
`;

const SignInButtonText = styled.Text`
  font-family: Poppins;
  font-size: ${getFontSize(17)}px;
  font-style: normal;
  font-weight: 700;
  color: #f8f8fa;
`;

const SignUpText = styled.Text`
  font-family: Poppins;
  font-size: ${getFontSize(14)}px;
  font-style: normal;
  font-weight: 700;
  color: #696969;
`;

export default function AuthButtons({
  onSignIn,
  toRegister,
  toRecoveryPassword,
  isLoading,
}: AuthButtonsProps) {
  return (
    <Container>
      <RecoveryPasswordText onPress={toRecoveryPassword}>
        Esqueceu sua senha?
      </RecoveryPasswordText>
      <SignInButton onPress={onSignIn} activeOpacity={0.7}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SignInButtonText>Entrar</SignInButtonText>
        )}
      </SignInButton>
      <SignUpText onPress={toRegister}>
        Ainda não possui conta, aperte aqui!
      </SignUpText>
    </Container>
  );
}
