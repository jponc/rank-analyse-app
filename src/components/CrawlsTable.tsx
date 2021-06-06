import React from "react";
import { Crawl } from "../types";
import { DataTable } from "react-native-paper";

type Props = {
  crawls: Crawl[];
  onPress: (crawlId: string) => void;
};

export const CrawlsTable: React.FC<Props> = ({ crawls, onPress }) => {
  const getDate = (d: Date): string => {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Keyword</DataTable.Title>
        <DataTable.Title>Search Engine</DataTable.Title>
        <DataTable.Title>Device</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        <DataTable.Title>Created At</DataTable.Title>
      </DataTable.Header>

      {crawls.map((c) => (
        <DataTable.Row key={c.id} onPress={() => onPress(c.id)} pointerEvents="none">
          <DataTable.Cell>{c.id}</DataTable.Cell>
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
