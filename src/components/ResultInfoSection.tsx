import React from "react";
import { Text, Divider } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { ResultInfo } from "../types";
import { theme } from "../core/theme";

type Props = {
  resultInfo?: ResultInfo;
  url: string;
};

export const ResultInfoSection: React.FC<Props> = ({ resultInfo, url }) => {
  if (!resultInfo) {
    return <Text>No result selected</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>ID</Text>
        <Text>{resultInfo.id}</Text>
      </View>
      <Divider />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>URL</Text>
        <Text>{url}</Text>
      </View>
      <Divider />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Title</Text>
        <Text>{resultInfo.title}</Text>
      </View>
      <Divider />
      <ScrollView style={styles.contentContainer}>
        <Text>{resultInfo.content}</Text>
      </ScrollView>
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
  contentContainer: {
    maxHeight: 200,
    padding: 10,
  },
});
