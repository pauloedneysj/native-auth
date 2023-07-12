import styled from "styled-components/native";
import { useState } from "react";

import useKeyboardDetect from "../../hooks/useKeyboardDetect";
import BackgroundLinearGradient from "../../components/common/BackgroundLinearGradient";
import SignInHeader from "./styles/Header";
import SignInInput from "./styles/Input";
import AuthButtons from "./styles/Button";
import SignInModal from "./styles/Modal";
import { storage } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { useScreenGuard } from "../../hooks/useScreenGuard";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { SignUpData, SignUpVariables } from "../../utils/types";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export default function SignUp() {
  const { navigate } = useNavigation();

  const isKeyboardOpen = useKeyboardDetect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [signUp, { loading }] = useMutation<SignUpData, SignUpVariables>(
    UserOperations.Mutations.signUp,
    {
      onCompleted: async ({ signUp: { token } }) => {
        storage.set("token", token);
        await handleAuthenticated();
      },
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  async function handleSignUp() {
    await signUp({ variables: { email, firstName, lastName, password } });
  }

  async function handleAuthenticated() {
    const isBiometricActive = storage.getBoolean("is-biometric-active");

    if (isBiometricActive == undefined) {
      setModalVisible(true);
    } else if (!!isBiometricActive) {
      storage.delete("screen-guard-status");
      await useScreenGuard();
    } else if (!isBiometricActive) {
      navigate("ProtectedRoutes");
    }

    const screenGuardSuccess = storage.getBoolean("screen-guard-success");

    if (!!screenGuardSuccess) {
      navigate("ProtectedRoutes");
    }
  }

  return (
    <BackgroundLinearGradient>
      <Container>
        <SignInHeader isKeyboardOpen={isKeyboardOpen} />
        <SignInInput
          placeholder="Nome"
          isKeyboardOpen={isKeyboardOpen}
          onChangeText={setFirstName}
        />
        <SignInInput
          placeholder="Sobrenome"
          isKeyboardOpen={isKeyboardOpen}
          onChangeText={setLastName}
        />
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
        <SignInModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleAuthenticated={handleAuthenticated}
        />
        {!isKeyboardOpen && (
          <>
            <AuthButtons onSignIn={handleSignUp} isLoading={loading} />
          </>
        )}
      </Container>
    </BackgroundLinearGradient>
  );
}
