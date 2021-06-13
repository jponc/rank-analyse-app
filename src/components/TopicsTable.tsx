import React from "react";
import { ResultTopic } from "../types";
import { DataTable } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { theme } from "../core/theme";

type Props = {
  topics: ResultTopic[];
};

export const TopicsTable: React.FC<Props> = ({ topics }) => {
  const renderItem = ({ item }: { item: ResultTopic }) => {
    return (
      <DataTable.Row
        key={item.id}
        pointerEvents="none"
      >
        <DataTable.Cell style={styles.labelColumn}>{item.label}</DataTable.Cell>
        <DataTable.Cell style={styles.scoreColumn}>{item.score}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title style={styles.labelColumn}>Label</DataTable.Title>
        <DataTable.Title style={styles.scoreColumn}>Score</DataTable.Title>
      </DataTable.Header>

      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    height: "100%"
  },
  labelColumn: {
    flex: 3,
  },
  scoreColumn: {
    flex: 1,
  },
});
