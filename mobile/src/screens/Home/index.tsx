import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import UserOperations from "../../graphql/operations/user";
import { storage } from "../../utils/functions";
import BackgroundLinearGradient from "../../components/common/BackgroundLinearGradient";
import HomeHeader from "./styles/Header";
import SignOutButton from "./styles/Button";
import { MeData } from "../../utils/types";
import client from "../../graphql/apollo-client";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export default function Home() {
  const { navigate } = useNavigation();

  const { data, loading, called, refetch } = useQuery<MeData>(
    UserOperations.Queries.me
  );

  function onLogout() {
    client.resetStore().then(() => {
      storage.delete("token");
      navigate("Home");
    });
  }

  useEffect(() => {
    refetch();
  }, []);

  if (loading || !data) {
    return <Container></Container>;
  }

  return (
    <BackgroundLinearGradient>
      <Container>
        <HomeHeader name={data.me.firstName} />
        <SignOutButton onPress={onLogout} />
      </Container>
    </BackgroundLinearGradient>
  );
}
