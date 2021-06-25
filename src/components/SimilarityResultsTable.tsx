import React from "react";
import { View, StyleSheet } from "react-native";
import { DataTable, Title } from "react-native-paper";
import { theme } from "../core/theme";
import { SimilarityKeyword, SimilarityResult } from "../types";

type Props = {
  similarityKeyword: SimilarityKeyword;
};

export const SimilarityResultsTable: React.FC<Props> = ({ similarityKeyword }) => {
  return (
    <View style={styles.container}>
      <View>
        <Title>{similarityKeyword.keyword}</Title>
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.titleColumn}>Title</DataTable.Title>
            <DataTable.Title style={styles.positionColumn}>Position</DataTable.Title>
            <DataTable.Title style={styles.seenColumn}>Seen</DataTable.Title>
          </DataTable.Header>

          {similarityKeyword.results.map((r: SimilarityResult) => (
            <DataTable.Row
              key={r.title}
            >
              <DataTable.Cell style={styles.titleColumn}>{r.title}</DataTable.Cell>
              <DataTable.Cell style={styles.positionColumn}>{r.averagePosition}</DataTable.Cell>
              <DataTable.Cell style={styles.seenColumn}>{r.seenCount}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  titleColumn: {
    flex: 4,
  },
  positionColumn: {
    flex: 1,
  },
  seenColumn: {
    flex: 1,
  },
});
