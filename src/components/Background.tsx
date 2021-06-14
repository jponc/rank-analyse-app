import React, { memo } from "react";
import { StyleSheet, KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";

type Props = {
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  children: React.ReactNode;
};

const Background = ({ children, justifyContent }: Props) => (
  <SafeAreaView style={styles.background}>
    <KeyboardAvoidingView
      style={[styles.container, { justifyContent: justifyContent }]}
      behavior="padding"
    >
      <ScrollView style={styles.contentContainer}>{children}</ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "100%",
    padding: 15,
  }
});

export default memo(Background);
