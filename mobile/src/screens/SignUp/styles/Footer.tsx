import { styled } from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { getFontSize } from "../../../utils/functions";

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BreakWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 3%;
`;

const BreakLine = styled.View`
  width: 30%;
  border: 0.7px solid #696969;
`;

const BreakText = styled.Text`
  padding: 0 3% 0 3%;
  font-family: Poppins;
  font-size: ${getFontSize(14)}px;
  font-style: normal;
  font-weight: 700;
  color: #696969;
`;

const OtherAccountsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 60%;
`;

function Break() {
  return (
    <BreakWrapper>
      <BreakLine />
      <BreakText>Ou</BreakText>
      <BreakLine />
    </BreakWrapper>
  );
}

function OtherAccounts() {
  return (
    <OtherAccountsWrapper>
      <Fontisto name="google" size={24} color="black" />
      <Fontisto name="facebook" size={24} color="black" />
      <Fontisto name="twitter" size={24} color="black" />
    </OtherAccountsWrapper>
  );
}

export default function Footer() {
  return (
    <Container>
      <Break />
      <OtherAccounts />
    </Container>
  );
}
