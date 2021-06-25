import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import Button from "../components/Button";
import { theme } from "../core/theme";
import {
  SimilarityScreenNavigationProp,
  SimilarityScreenRouteProp,
} from "../types";

import { isLargeScreen } from "../core/screen";
import { SimilarityContext } from "../contexts/SimilarityContext";

type Props = {
  route: SimilarityScreenRouteProp;
  navigation: SimilarityScreenNavigationProp;
};

export const SimilarityScreen: React.FC<Props> = ({ navigation }) => {
  const { similarityAnalysis, compareSimilarity, isSimilarityAnalysisLoading } = useContext(SimilarityContext)
  const [keyword1, setKeyword1] = useState<string>("");
  const [keyword2, setKeyword2] = useState<string>("");

  const handleOnCompare = () => {
    compareSimilarity(keyword1, keyword2)
  };

  let styles: any = { ...mobileStyles };

  if (isLargeScreen()) {
    styles = { ...styles, ...largeStyles };
  }

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content title="Similarity Analysis" />
      </Appbar>
      <Background>
        <View style={styles.inputsContainer}>
          <TextInput
            label="First Keyword"
            value={keyword1}
            onChangeText={(text) => setKeyword1(text)}
            style={styles.keywordInput}
          />
          <TextInput
            label="Second Keyword"
            value={keyword2}
            onChangeText={(text) => setKeyword2(text)}
            style={styles.keywordInput}
          />

          <Button mode="contained" onPress={handleOnCompare} loading={isSimilarityAnalysisLoading} disabled={isSimilarityAnalysisLoading}>
            Compare
          </Button>
        </View>
      </Background>
    </StatusBarView>
  );
};

const mobileStyles = StyleSheet.create({
  inputsContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  keywordInput: {
    marginBottom: 10,
    backgroundColor: theme.colors.surface,
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});

const largeStyles = StyleSheet.create({
  inputsContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    width: "50%",
  },
});
