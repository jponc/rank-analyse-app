import React from "react";
import { Headline } from "react-native-paper";
import { HomeScreenNavigationProp } from "../types";
import Background from "../components/Background";
import Button from "../components/Button";
import { View, StyleSheet } from "react-native";
import { StatusBarView } from "../components/StatusBarView";
import { isLargeScreen } from "../core/screen";

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  let styles: any = { ...mobileStyles };

  if (isLargeScreen()) {
    styles = { ...styles, ...largeStyles };
  }

  const handleViewCrawls = () => {
    navigation.push("Crawls");
  };

  const handleViewSimilarityAnalysis = () => {
    navigation.push("Similarity");
  };

  return (
    <StatusBarView>
      <Background>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Headline style={styles.title}>Web Scraping</Headline>
            </View>
            <Button mode="contained" onPress={handleViewCrawls}>
              View Crawls
            </Button>
            <Button mode="contained" onPress={handleViewSimilarityAnalysis}>
              View Similarity Analysis
            </Button>
          </View>
        </View>
      </Background>
    </StatusBarView>
  );
};

const mobileStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 30,
  },
  titleContainer: {
    marginBottom: 50,
    display: "flex",
    justifyContent: "center",
  },
});

const largeStyles = StyleSheet.create({
  titleContainer: {
    marginBottom: 50,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "50%",
  },
});
