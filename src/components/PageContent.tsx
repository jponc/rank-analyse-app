import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import { theme } from "../core/theme";

type Props = {
  content: string
}

export const PageContent: React.FC<Props> = ({ content }) => (
  <ScrollView style={styles.container}>
    <Paragraph>{content}</Paragraph>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    width: "100%",
  },
});
