import * as LocalAuthentication from "expo-local-authentication";

export async function useBiometricAvailable(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync();

  if (!compatible) {
    return false;
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!enrolled) {
    return false;
  }

  return true;
}
