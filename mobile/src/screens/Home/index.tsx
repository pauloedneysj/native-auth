import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { storage } from "../../utils/functions";
import BackgroundLinearGradient from "../../components/common/BackgroundLinearGradient";
import HomeHeader from "./styles/Header";
import SignOutButton from "./styles/Button";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export default function Home() {
  const { navigate } = useNavigation();

  function handleSignOut() {
    storage.clearAll();
    navigate("Home");
  }

  return (
    <BackgroundLinearGradient>
      <Container>
        <HomeHeader />
        <SignOutButton onPress={handleSignOut} />
      </Container>
    </BackgroundLinearGradient>
  );
}
