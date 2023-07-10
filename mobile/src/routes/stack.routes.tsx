import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { storage } from "../utils/functions";
import SignIn from "../screens/SignIn";
import ProtectedRoutes from "./protected.routes";

export default function StackRoutes() {
  const Stack = createNativeStackNavigator();
  const { navigate } = useNavigation();

  const sessionToken = storage.getString("session-token");

  useEffect(() => {
    if (sessionToken) {
      navigate("AuthRoutes");
    }
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="AuthRoutes" component={ProtectedRoutes} />
    </Stack.Navigator>
  );
}
