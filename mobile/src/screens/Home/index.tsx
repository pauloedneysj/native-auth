import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";

import UserOperations from "../../graphql/operations/user";
import { storage } from "../../utils/functions";
import BackgroundLinearGradient from "../../components/common/BackgroundLinearGradient";
import HomeHeader from "./styles/Header";
import SignOutButton from "./styles/Button";
import { MeData } from "../../utils/types";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export default function Home() {
  const { navigate } = useNavigation();

  const { data, loading } = useQuery<MeData>(UserOperations.Queries.me);

  const me = useMemo(() => data?.me, [data?.me]);

  function handleSignOut() {
    storage.delete("token");
    navigate("Home");
  }

  return (
    <BackgroundLinearGradient>
      {loading ? (
        <Container></Container>
      ) : (
        <Container>
          <HomeHeader me={me} />
          <SignOutButton onPress={handleSignOut} />
        </Container>
      )}
    </BackgroundLinearGradient>
  );
}
