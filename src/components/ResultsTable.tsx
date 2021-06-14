import React from "react";
import { Result } from "../types";
import { Button, Card, DataTable, Paragraph, Title } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { theme } from "../core/theme";
import { isLargeScreen } from "../core/screen";

type Props = {
  results: Result[];
  onPress: (resultId: string) => void;
};

const getStatusText = (isError: boolean, isDone: boolean): string => {
  let status = "";

  if (isError) {
    status = "Error";
  } else if (isDone) {
    status = "Done";
  } else {
    status = "Fetching";
  }

  return status;
}

export const ResultsTableLarge: React.FC<Props> = ({ results, onPress }) => {
  const styles = stylesLarge;

  const renderItem = ({ item }: { item: Result }) => {
    return (
      <DataTable.Row
        key={item.id}
        onPress={() => onPress(item.id)}
        pointerEvents="none"
      >
        <DataTable.Cell style={styles.positionColumn}>{item.position}</DataTable.Cell>
        <DataTable.Cell style={styles.titleColumn}>{item.title}</DataTable.Cell>
        <DataTable.Cell style={styles.linkColumn}>{item.link}</DataTable.Cell>
        <DataTable.Cell style={styles.statusColumn}>{getStatusText(item.isError, item.done)}</DataTable.Cell>
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
      />
    </DataTable>
  );
};

const ResultsTableMobile: React.FC<Props> = ({ results, onPress }) => {
  const styles = stylesMobile;

  return (
    <>
      {results.map((r) => (
        <Card style={styles.cardContainer} key={r.id}>
          <Card.Content>
            <Title>#{r.position}. {r.title}</Title>
            <Paragraph>Link: {r.link}</Paragraph>
            <Paragraph>Status: {getStatusText(r.isError, r.done)}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actionsContainer}>
            <Button onPress={() => onPress(r.id)}>View</Button>
          </Card.Actions>
        </Card>
      ))}
    </>
  );
};

export const ResultsTable: React.FC<Props> = (props) => {
  if (isLargeScreen()) {
    return (<ResultsTableLarge {...props} />)
  } else {
    return (<ResultsTableMobile {...props} />)
  }
}

const stylesLarge = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
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

const stylesMobile = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
  actionsContainer: {
    justifyContent: "flex-end"
  },
});
