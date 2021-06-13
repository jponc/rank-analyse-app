import React from "react";
import { Text, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Result } from "../types";
import { theme } from "../core/theme";

type Props = {
  result: Result;
};

export const ResultSection: React.FC<Props> = ({ result }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Result ID</Text>
        <Text>{result.id}</Text>
      </View>
      <Divider />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Crawl ID</Text>
        <Text>{result.crawlId}</Text>
      </View>
      <Divider />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Link</Text>
        <Text>{result.link}</Text>
      </View>
      <Divider />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Title</Text>
        <Text>{result.title}</Text>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
  },
  rowContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
});
