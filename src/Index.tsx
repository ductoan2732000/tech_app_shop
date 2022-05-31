import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "src/pages/login/Welcome";
import Login from "src/pages/login/Login";
import Navigate from "src/pages/home/Navigate";
const Stack = createNativeStackNavigator();
export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Navigate" component={Navigate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
