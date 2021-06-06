import React from "react";
import { Text, DataTable } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { ResultLink } from "../types";
import { theme } from "../core/theme";

type Props = {
  resultLinks: ResultLink[];
};

export const ResultLinksSection: React.FC<Props> = ({ resultLinks }) => {
  const renderItem = ({ item }: { item: ResultLink }) => {
    return (
      <DataTable.Row key={item.id}>
        <DataTable.Cell>{item.text}</DataTable.Cell>
        <DataTable.Cell>{item.linkUrl}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  if (resultLinks.length === 0) {
    return <Text>No result links</Text>;
  }

  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title>Text</DataTable.Title>
        <DataTable.Title>Link</DataTable.Title>
      </DataTable.Header>

      <FlatList
        data={resultLinks}
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
});
