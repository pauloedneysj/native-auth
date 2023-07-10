import React from "react";
import styled from "styled-components/native";
import { getFontSize, storage } from "../../../utils/functions";

interface SignInModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.View`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.Modal``;

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  align-items: center;
  justify-content: center;
  margin: 5%;
  padding: 5%;
  border-radius: 20px;
  background-color: #f8f8fa;
`;

const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 25%;
`;

const ModalText = styled.Text`
  margin-bottom: 15px;
  font-size: ${getFontSize(16)}px;
  text-align: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  border-radius: 16px;
  background-color: #55c2da;
`;

const DenyButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #55c2da;
  width: 40%;
  height: 100%;
  border-radius: 16px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export default function SignInModal({
  modalVisible,
  setModalVisible,
}: SignInModalProps) {
  function handleConfirmation() {
    storage.set("is-biometric-active", true);
    setModalVisible(false);
  }

  function handleDenied() {
    setModalVisible(false);
  }

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={handleModalClose}
      >
        <ModalWrapper>
          <ModalView
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <ModalText>
              Você possui sensor biometrico, gostaria de útiliza-lo?
            </ModalText>
            <ButtonsWrapper>
              <ConfirmButton onPress={handleConfirmation}>
                <ButtonText>Sim</ButtonText>
              </ConfirmButton>
              <DenyButton onPress={handleDenied}>
                <ButtonText>Não</ButtonText>
              </DenyButton>
            </ButtonsWrapper>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </Container>
  );
}
