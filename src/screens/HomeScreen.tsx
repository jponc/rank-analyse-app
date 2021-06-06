import React from "react";
import { Headline } from "react-native-paper";
import { HomeScreenNavigationProp } from "../types";
import Background from "../components/Background";
import Button from "../components/Button";
import { View, StyleSheet } from "react-native";

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleViewCrawls = () => {
    navigation.push("Crawls");
  };

  return (
    <Background justifyContent="center">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Headline style={styles.title}>Web Scraping</Headline>
        </View>
        <Button mode="contained" onPress={handleViewCrawls}>
          View Crawls
        </Button>
        </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "50%",
  },
  title: {
    fontSize: 30,
  },
  titleContainer: {
    marginBottom: 80,
  },
});
