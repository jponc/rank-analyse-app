import React from "react";
import { ResultEntity } from "../types";
import { DataTable } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { theme } from "../core/theme";

type Props = {
  entities: ResultEntity[];
};

export const EntitiesTable: React.FC<Props> = ({ entities }) => {
  const renderItem = ({ item }: { item: ResultEntity }) => {
    return (
      <DataTable.Row key={item.id} pointerEvents="none">
        <DataTable.Cell style={styles.matchedTextColumn}>
          {item.matchedText}
        </DataTable.Cell>
        <DataTable.Cell style={styles.entityColumn}>
          {item.entity}
        </DataTable.Cell>
        <DataTable.Cell style={styles.confidenceScoreColumn}>
          {item.confidenceScore}
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title style={styles.matchedTextColumn}>
          Matched Text
        </DataTable.Title>
        <DataTable.Title style={styles.entityColumn}>Entity</DataTable.Title>
        <DataTable.Title style={styles.confidenceScoreColumn}>
          Confidence
        </DataTable.Title>
      </DataTable.Header>

      <FlatList
        data={entities}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    height: "100%",
  },
  entityColumn: {
    flex: 1,
  },
  relevanceScoreColumn: {
    flex: 1,
  },
  confidenceScoreColumn: {
    flex: 1,
  },
  matchedTextColumn: {
    flex: 1,
  },
});
