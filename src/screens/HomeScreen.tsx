import React from "react";
import { Headline } from "react-native-paper";
import { HomeScreenNavigationProp } from "../types";
import Background from "../components/Background";
import Button from "../components/Button";
import { View, StyleSheet } from "react-native";
import { StatusBarView } from "../components/StatusBarView";

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleViewCrawls = () => {
    navigation.push("Crawls");
  };

  return (
    <StatusBarView>
      <Background>
        <View style={styles.titleContainer}>
          <Headline style={styles.title}>Web Scraping</Headline>
        </View>
        <Button mode="contained" onPress={handleViewCrawls}>
          View Crawls
        </Button>
      </Background>
      </StatusBarView>
    );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  titleContainer: {
    marginBottom: 50,
    display: "flex",
    justifyContent: "center",
  },
});
