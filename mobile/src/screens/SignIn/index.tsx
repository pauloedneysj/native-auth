import styled from "styled-components/native";
import { useState } from "react";

import useKeyboardDetect from "../../hooks/useKeyboardDetect";
import BackgroundLinearGradient from "../../components/common/BackgroundLinearGradient";
import SignInHeader from "./styles/Header";
import SignInInput from "./styles/Input";

import SignInModal from "./styles/Modal";
import Footer from "./styles/Footer";
import { storage } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { useScreenGuard } from "../../hooks/useScreenGuard";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { SignInData, SignInVariables } from "../../utils/types";
import SignInButton from "./styles/Button";
import { useBiometricAvailable } from "../../hooks/useBiometricAvalaible";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function SignIn() {
  const { navigate } = useNavigation();

  const isKeyboardOpen = useKeyboardDetect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [signIn, { loading }] = useMutation<SignInData, SignInVariables>(
    UserOperations.Mutations.signIn,
    {
      onCompleted: async ({ signIn: { token } }) => {
        storage.set("token", token);
        await handleAuthenticated();
      },
      onError: ({ message }) => {
        console.log(message);
      },
      awaitRefetchQueries: true,
    }
  );

  async function handleSignIn() {
    const tokenAlreadyExists = storage.contains("token");

    if (!tokenAlreadyExists) {
      await signIn({ variables: { email, password } });
    } else {
      await handleAuthenticated();
    }
  }

  async function handleAuthenticated() {
    const isBiometricAvalaible = await useBiometricAvailable();
    const isBiometricActive = storage.getBoolean("is-biometric-active");

    if (!isBiometricAvalaible) {
      navigate("ProtectedRoutes");
    } else if (isBiometricActive == undefined) {
      setModalVisible(true);
    } else if (isBiometricActive) {
      storage.delete("screen-guard-status");
      await useScreenGuard();
    } else if (!isBiometricActive) {
      navigate("ProtectedRoutes");
    }

    const screenGuardSuccess = storage.getBoolean("screen-guard-success");

    if (screenGuardSuccess) {
      navigate("ProtectedRoutes");
    }
  }

  return (
    <BackgroundLinearGradient>
      <Container>
        <SignInHeader isKeyboardOpen={isKeyboardOpen} />
        <SignInInput
          placeholder="E-mail"
          isKeyboardOpen={isKeyboardOpen}
          onChangeText={setEmail}
        />
        <SignInInput
          placeholder="Password"
          secureTextEntry={true}
          isKeyboardOpen={isKeyboardOpen}
          onChangeText={setPassword}
        />
        <SignInButton onSignIn={handleSignIn} isLoading={loading} />
        <SignInModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleAuthenticated={handleAuthenticated}
        />
        {!isKeyboardOpen && (
          <>
            <Footer />
          </>
        )}
      </Container>
    </BackgroundLinearGradient>
  );
}
