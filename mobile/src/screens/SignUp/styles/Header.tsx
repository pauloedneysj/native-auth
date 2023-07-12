import { styled } from "styled-components/native";
import { getFontSize } from "../../../utils/functions";

interface HeaderProps {
  isKeyboardOpen: boolean;
}

const HeaderWrapper = styled.View<{ isKeyboardOpen: boolean }>`
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.isKeyboardOpen ? "10% 0 8% 0" : "25% 0 20% 0")};
`;

const Title = styled.Text`
  color: #111111;
  font-family: Poppins;
  font-size: ${getFontSize(30)}px;
  font-style: normal;
  font-weight: 700;
`;

export default function SignInHeader({ isKeyboardOpen }: HeaderProps) {
  return (
    <HeaderWrapper isKeyboardOpen={isKeyboardOpen}>
      <Title>Cadastro</Title>
    </HeaderWrapper>
  );
}
