import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";

import { HomeScreen } from "../screens/index.screens";

const Stack = createNativeStackNavigator();

export const StackNavigator = (props) => {
  // screenOptions is the options that will be applied to the screens
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "default",
  };
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={"Home"}>
      <Stack.Screen name={"Home"} component={HomeScreen} />
    </Stack.Navigator>
  );
};
