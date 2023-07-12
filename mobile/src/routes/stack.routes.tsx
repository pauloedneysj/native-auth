import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { storage } from "../utils/functions";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ProtectedRoutes from "./protected.routes";

export default function StackRoutes() {
  const Stack = createNativeStackNavigator();
  const { navigate } = useNavigation();
  const tokenAlreadyExists = storage.contains("token");

  useEffect(() => {
    if (tokenAlreadyExists) {
      navigate("ProtectedRoutes");
    }
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProtectedRoutes" component={ProtectedRoutes} />
    </Stack.Navigator>
  );
}
