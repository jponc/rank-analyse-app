import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { DataTable, Title, Checkbox, Paragraph } from "react-native-paper";
import { SimilarityMapType } from "../contexts/SimilarityContext";
import { theme } from "../core/theme";
import { SimilarityKeyword, SimilarityResult } from "../types";

type Props = {
  minSeenCount: number;
  similarityKeyword: SimilarityKeyword;
  similarityMap: SimilarityMapType;
  selectedLink: string;
  onLinkSelect: (newLink: string) => void;
};

type TableProps = {
  results: SimilarityResult[];
  similarityMap: SimilarityMapType;
  selectedLink: string;
  onLinkSelect: (newLink: string) => void;
};

const Table: React.FC<TableProps> = ({
  results,
  similarityMap,
  selectedLink,
  onLinkSelect,
}) => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={styles.checkboxColumn}>&nbsp;</DataTable.Title>
        <DataTable.Title style={styles.titleColumn}>Title</DataTable.Title>
        <DataTable.Title style={styles.positionColumn}>
          Position
        </DataTable.Title>
        <DataTable.Title style={styles.seenColumn}>Seen</DataTable.Title>
      </DataTable.Header>

      {results.map((r: SimilarityResult) => {
        const withMatch = similarityMap[r.link] > 1;
        const isSelected = r.link === selectedLink;
        const checkbox = (
          <Checkbox
            status={isSelected ? "checked" : "unchecked"}
            onPress={() => onLinkSelect(isSelected ? "" : r.link)}
          />
        );

        return (
          <DataTable.Row key={r.link}>
            <DataTable.Cell style={styles.checkboxColumn}>
              {withMatch && checkbox}
            </DataTable.Cell>
            <DataTable.Cell style={styles.titleColumn}>
              <View style={styles.titleContent}>
                <Paragraph style={styles.title}>{r.title}</Paragraph>
                <Paragraph>{r.link}</Paragraph>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.positionColumn}>
              {r.averagePosition.toFixed(2)}
            </DataTable.Cell>
            <DataTable.Cell style={styles.seenColumn}>
              {r.seenCount}
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

export const SimilarityResultsTable: React.FC<Props> = ({
  minSeenCount,
  similarityKeyword,
  similarityMap,
  selectedLink,
  onLinkSelect,
}) => {
  const filteredResults = similarityKeyword.results.filter(
    (r) =>
      r.seenCount >= minSeenCount &&
      (selectedLink === "" || selectedLink === r.link)
  );

  const table = useMemo(
    () => (
      <Table
        onLinkSelect={onLinkSelect}
        selectedLink={selectedLink}
        results={filteredResults}
        similarityMap={similarityMap}
      />
    ),
    [filteredResults, similarityMap]
  );

  return (
    <View style={styles.container}>
      <View>
        <Title>{similarityKeyword.keyword}</Title>
      </View>
      <View>{table}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  checkboxColumn: {
    flex: 0.5,
  },
  titleColumn: {
    flex: 4,
  },
  titleContent: {
    display: "flex",
    flexDirection: "column",
  },
  title: {},
  positionColumn: {
    flex: 1,
  },
  seenColumn: {
    flex: 1,
  },
});
