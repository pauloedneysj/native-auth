import styled from "styled-components/native";
import { useState } from "react";

import useKeyboardDetect from "../../hooks/useKeyboardDetect";
import BackgroundLinearGradient from "../../components/common/BackgroundLinearGradient";
import SignInHeader from "./styles/Header";
import SignInInput from "./styles/Input";
import AuthButtons from "./styles/Button";
import SignInModal from "./styles/Modal";
import Footer from "./styles/Footer";
import { storage } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { useScreenGuard } from "../../hooks/useScreenGuard";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export default function SignIn() {
  const { navigate } = useNavigation();

  const isKeyboardOpen = useKeyboardDetect();

  const [modalVisible, setModalVisible] = useState(false);

  async function handleSignIn() {
    const isBiometricActive = storage.getBoolean("is-biometric-active");

    storage.set("authentication-status", false);

    if (isBiometricActive === undefined) {
      setModalVisible(true);
    } else if (isBiometricActive === false) {
      storage.set("session-token", "You are authenticated");
      navigate("AuthRoutes");
    } else if (isBiometricActive === true) {
      storage.set("session-token", "You are authenticated");
      await useScreenGuard();
    }

    const authStatus = storage.getBoolean("authentication-status");

    if (authStatus === true) {
      navigate("AuthRoutes");
    }
  }

  return (
    <BackgroundLinearGradient>
      <Container>
        <SignInHeader isKeyboardOpen={isKeyboardOpen} />
        <SignInInput placeholder="E-mail" isKeyboardOpen={isKeyboardOpen} />
        <SignInInput
          placeholder="Password"
          secureTextEntry={true}
          isKeyboardOpen={isKeyboardOpen}
        />
        <SignInModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {!isKeyboardOpen && (
          <>
            <AuthButtons
              onSignIn={handleSignIn}
              toRegister={() => {}}
              toRecoveryPassword={() => {}}
              isLoading={false}
            />
            <Footer />
          </>
        )}
      </Container>
    </BackgroundLinearGradient>
  );
}
