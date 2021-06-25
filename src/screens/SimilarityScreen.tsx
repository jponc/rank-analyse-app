import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import { SimilarityScreenNavigationProp, SimilarityScreenRouteProp } from "../types";

type Props = {
  route: SimilarityScreenRouteProp;
  navigation: SimilarityScreenNavigationProp;
};

export const SimilarityScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content title="Similarity Analysis" />
      </Appbar>
      <Background>
      </Background>
    </StatusBarView>
  );
};

const styles = StyleSheet.create({
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});
