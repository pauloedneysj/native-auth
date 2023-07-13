import { styled } from "styled-components/native";
import { getFontSize } from "../../../utils/functions";

interface HeaderProps {
  isKeyboardOpen: boolean;
}

const HeaderWrapper = styled.View<{ isKeyboardOpen: boolean }>`
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.isKeyboardOpen ? "10% 0 10% 0" : "20% 0 25% 0")};
`;

const Title = styled.Text`
  color: #111111;
  font-family: Poppins;
  font-size: ${getFontSize(30)}px;
  font-style: normal;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  color: #525252;
  font-family: Poppins;
  font-size: ${getFontSize(16)}px;
  font-style: normal;
  font-weight: 400;
`;

export default function SignInHeader({ isKeyboardOpen }: HeaderProps) {
  return (
    <HeaderWrapper isKeyboardOpen={isKeyboardOpen}>
      <Title>NativeAuth</Title>
      <Subtitle>How to i get started lorem ipsum dolor at?</Subtitle>
    </HeaderWrapper>
  );
}
