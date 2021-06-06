import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { App } from "./App";
import { CrawlContainer } from "./contexts/CrawlContext";

import { theme } from "./core/theme";
import { ResultContainer } from "./contexts/ResultContext";

const config = {
  screens: {
    Home: "",
    Crawls: "crawls",
    Crawl: "crawls/:id",
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
        <CrawlContainer>
          <ResultContainer>
            <App />
          </ResultContainer>
        </CrawlContainer>
      </NavigationContainer>
    </PaperProvider>
  );
};
