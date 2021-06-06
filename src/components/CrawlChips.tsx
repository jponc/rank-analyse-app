import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { Crawl } from "../types";
import { theme } from "../core/theme";

type Props = {
  crawl: Crawl;
};

export const CrawlChips: React.FC<Props> = ({ crawl }) => {
  return (
    <View style={styles.container}>
      <Chip style={styles.chip}>{crawl.id}</Chip>
      <Chip style={styles.chip}>{crawl.keyword}</Chip>
      <Chip style={styles.chip}>{crawl.searchEngine}</Chip>
      <Chip style={styles.chip}>{crawl.device}</Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  chip: {
    backgroundColor: theme.colors.surface,
    marginRight: 10,
  },
});
