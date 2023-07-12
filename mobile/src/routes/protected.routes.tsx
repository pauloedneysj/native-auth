import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { storage } from "../utils/functions";
import AuthRoutes from "./auth.routes";

export default function ProtectedRoutes() {
  const { navigate } = useNavigation();
  const tokenAlreadyExists = storage.contains("token");

  useEffect(() => {
    if (!tokenAlreadyExists) {
      navigate("SignIn");
    }
  });

  return <>{tokenAlreadyExists && <AuthRoutes />}</>;
}
