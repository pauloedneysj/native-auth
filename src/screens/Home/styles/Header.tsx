import { styled } from "styled-components/native";
import { getFontSize } from "../../../utils/functions";

const HeaderWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 25%;
`;

const Title = styled.Text`
  color: #111111;
  font-family: Poppins;
  font-size: ${getFontSize(30)}px;
  font-style: normal;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  margin-bottom: 55%;
  color: #525252;
  font-family: Poppins;
  font-size: ${getFontSize(16)}px;
  font-style: normal;
  font-weight: 400;
`;

const WelcomeText = styled.Text`
  font-size: ${getFontSize(26)}px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  opacity: 0.9;
  color: black;
`;

export default function HomeHeader() {
  return (
    <HeaderWrapper>
      <Title>NativeAuth</Title>
      <Subtitle>How to i get started lorem ipsum dolor at?</Subtitle>
      <WelcomeText>{`Parabéns ${"<user>"}, você foi autenticado com sucesso.`}</WelcomeText>
    </HeaderWrapper>
  );
}
