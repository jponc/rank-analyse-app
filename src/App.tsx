import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

// Screens
import { HomeScreen } from "./screens/HomeScreen";
import { CrawlsScreen } from "./screens/CrawlsScreen";
import { CrawlScreen } from "./screens/CrawlScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      headerMode="none"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Crawls" component={CrawlsScreen} />
      <Stack.Screen name="Crawl" component={CrawlScreen} />
    </Stack.Navigator>
  );
};
