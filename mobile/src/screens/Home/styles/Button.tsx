import { styled } from "styled-components/native";
import { getFontSize } from "../../../utils/functions";

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 5%;
  height: 8%;
  width: 40%;
  margin-top: 4%;
  border-radius: 16px;
  background-color: #55c2da;
`;

const ButtonText = styled.Text`
  font-size: ${getFontSize(17)}px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  color: #f8f8fa;
`;

interface SignOutButtonProps {
  onPress: () => void;
}

export default function SignOutButton({ onPress }: SignOutButtonProps) {
  return (
    <Button activeOpacity={0.7} onPress={onPress}>
      <ButtonText>Sair</ButtonText>
    </Button>
  );
}
