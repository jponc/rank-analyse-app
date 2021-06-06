import React, { memo } from "react";
import { StyleSheet, KeyboardAvoidingView, SafeAreaView } from "react-native";

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
      {children}
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
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(Background);
