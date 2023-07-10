import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { storage } from "../utils/functions";
import AuthRoutes from "./auth.routes";

export default function ProtectedRoutes() {
  const { navigate } = useNavigation();

  const sessionToken = storage.getString("session-token");

  useEffect(() => {
    if (!sessionToken) {
      navigate("SignIn");
    }
  });

  return <>{sessionToken && <AuthRoutes />}</>;
}
