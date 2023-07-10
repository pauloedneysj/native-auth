import { styled } from "styled-components/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface InputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  isKeyboardOpen: boolean;
}

const InputWrapper = styled.View<{ isKeyboardOpen: boolean }>`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: ${(props) => (props.isKeyboardOpen ? "15%" : "9%")};
  margin: 2% 0 2% 0;
  border-radius: 16px;
  opacity: 0.9;
  background-color: #f8f8fa;
  border: 0.3px solid #c0c2ce;
`;

const InputText = styled.TextInput`
  width: 80%;
  font-family: Poppins;
  font-size: 15.5px;
  font-weight: 400;
  color: #696969;
`;

export default function SignInInput({
  placeholder,
  secureTextEntry,
  isKeyboardOpen,
}: InputProps) {
  return (
    <InputWrapper isKeyboardOpen={isKeyboardOpen}>
      {secureTextEntry ? (
        <MaterialCommunityIcons
          name="form-textbox-password"
          size={24}
          color="#0e1111"
        />
      ) : (
        <Feather name="user" size={30} color="#0e1111" />
      )}

      <InputText placeholder={placeholder} secureTextEntry={secureTextEntry} />
    </InputWrapper>
  );
}
