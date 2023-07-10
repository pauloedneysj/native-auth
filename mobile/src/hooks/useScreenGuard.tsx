import * as LocalAuthentication from "expo-local-authentication";
import { storage } from "../utils/functions";

export async function useBiometricExistsValue() {
  const compatible = await LocalAuthentication.hasHardwareAsync();

  if (!compatible) {
    return null;
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!enrolled) {
    return null;
  }

  storage.set("is-biometric-available", true);
}

export async function useScreenGuard() {
  const sessionToken = storage.getString("session-token");

  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: "Coloque sua biometria",
  });

  if (auth.success && sessionToken) {
    storage.set("authentication-status", true);
  } else {
    storage.set("authentication-status", false);
    await useScreenGuard();
  }
}
