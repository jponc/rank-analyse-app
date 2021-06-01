import React from "react";
import { HomeScreen } from "./screens/HomeScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      headerMode="none"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
