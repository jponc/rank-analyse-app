import React from "react";
import { Result } from "../types";
import { DataTable } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { theme } from "../core/theme";

type Props = {
  results: Result[];
  onPress: (resultId: string) => void;
};

export const ResultsTable: React.FC<Props> = ({ results, onPress }) => {
  const renderItem = ({ item }: { item: Result }) => {
    let status = "";

    if (item.isError) {
      status = "Error";
    } else if (item.done) {
      status = "Done";
    } else {
      status = "Fetching";
    }
    return (
      <DataTable.Row
        key={item.id}
        onPress={() => onPress(item.id)}
        pointerEvents="none"
      >
        <DataTable.Cell style={styles.positionColumn}>{item.position}</DataTable.Cell>
        <DataTable.Cell style={styles.titleColumn}>{item.title}</DataTable.Cell>
        <DataTable.Cell style={styles.linkColumn}>{item.link}</DataTable.Cell>
        <DataTable.Cell style={styles.statusColumn}>{status}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title style={styles.positionColumn}>Position</DataTable.Title>
        <DataTable.Title style={styles.titleColumn}>Title</DataTable.Title>
        <DataTable.Title style={styles.linkColumn}>Link</DataTable.Title>
        <DataTable.Title style={styles.statusColumn}>Status</DataTable.Title>
      </DataTable.Header>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        style={styles.listContainer}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface
  },
  listContainer: {
    height: 700
  },
  positionColumn: {
    flex: 0.5,
  },
  titleColumn: {
    flex: 3,
  },
  linkColumn: {
    flex: 3,
  },
  statusColumn: {
    flex: 1,
  },
});
