import React from "react";
import { Crawl } from "../types";
import { Card, DataTable, Button, Title, Paragraph } from "react-native-paper";
import { theme } from "../core/theme";
import { StyleSheet } from "react-native";
import { isLargeScreen } from "../core/screen";

type Props = {
  crawls: Crawl[];
  onPress: (crawlId: string) => void;
};

const getDate = (d: Date): string => {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const CrawlsTableLarge: React.FC<Props> = ({ crawls, onPress }) => {
  const styles = stylesLarge;

  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title>Keyword</DataTable.Title>
        <DataTable.Title>Search Engine</DataTable.Title>
        <DataTable.Title>Device</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        <DataTable.Title>Created At</DataTable.Title>
      </DataTable.Header>

      {crawls.map((c) => (
        <DataTable.Row
          key={c.id}
          onPress={() => onPress(c.id)}
          pointerEvents="none"
        >
          <DataTable.Cell>{c.keyword}</DataTable.Cell>
          <DataTable.Cell>{c.searchEngine}</DataTable.Cell>
          <DataTable.Cell>{c.device}</DataTable.Cell>
          <DataTable.Cell>{c.done ? "Done" : "Fetching"}</DataTable.Cell>
          <DataTable.Cell>{getDate(c.createdAt)}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const CrawlsTableMobile: React.FC<Props> = ({ crawls, onPress }) => {
  const styles = stylesMobile;

  return (
    <>
      {crawls.map((c) => (
        <Card style={styles.cardContainer} key={c.id}>
          <Card.Content>
            <Title>{c.keyword}</Title>
            <Paragraph>Search Engine: {c.searchEngine}</Paragraph>
            <Paragraph>Device: {c.device}</Paragraph>
            <Paragraph>Status: {c.done ? "Done" : "Fetching"}</Paragraph>
            <Paragraph>Created: {getDate(c.createdAt)}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actionsContainer}>
            <Button onPress={() => onPress(c.id)}>View</Button>
          </Card.Actions>
        </Card>
      ))}
    </>
  );
};

export const CrawlsTable: React.FC<Props> = (props) => {
  if (isLargeScreen()) {
    return (<CrawlsTableLarge {...props} />)
  } else {
    return (<CrawlsTableMobile {...props} />)
  }
}

const stylesLarge = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
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
