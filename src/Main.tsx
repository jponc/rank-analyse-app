import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { App } from "./App";

import { theme } from "./core/theme";

const config = {
  screens: {
    Home: "",
  },
};

const linking: LinkingOptions = {
  prefixes: [],
  config,
};

export const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
};
