import * as LocalAuthentication from "expo-local-authentication";

import { storage } from "../utils/functions";

export async function useScreenGuard() {
  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: "Coloque sua biometria",
    cancelLabel: "Cancelar",
  });

  if (auth.success) {
    storage.set("screen-guard-success", true);
  } else {
    storage.set("screen-guard-success", false);
    await useScreenGuard();
  }
}

// export async function useBiometricExistsValue() {
//   const compatible = await LocalAuthentication.hasHardwareAsync();

//   if (!compatible) {
//     return null;
//   }

//   const enrolled = await LocalAuthentication.isEnrolledAsync();

//   if (!enrolled) {
//     return null;
//   }

//   storage.set("is-biometric-available", true);
// }
