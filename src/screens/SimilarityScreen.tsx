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
import { SimilarityResultsTable } from "../components/SimilarityResultsTable";
import { SimilarityPercentage } from "../components/SimilarityPercentage";

type Props = {
  route: SimilarityScreenRouteProp;
  navigation: SimilarityScreenNavigationProp;
};

export const SimilarityScreen: React.FC<Props> = ({ navigation }) => {
  const {
    similarityAnalysis,
    similarityMap,
    compareSimilarity,
    isSimilarityAnalysisLoading,
  } = useContext(SimilarityContext);
  const [keyword1, setKeyword1] = useState<string>("");
  const [keyword2, setKeyword2] = useState<string>("");
  const [minSeenText, setMinSeenText] = useState<string>("");
  const [minSeen, setMinSeen] = useState<number>(0);
  const [selectedLink, setSelectedLink] = useState<string>("");

  const handleOnCompare = () => {
    compareSimilarity(keyword1, keyword2);
  };

  const handleOnLinkSelect = (newLink: string) => {
    setSelectedLink(newLink);
  };

  const handleFilterMinSeenCountResults = () => {
    if (minSeenText === "") {
      setMinSeen(0);
    } else {
      setMinSeen(parseInt(minSeenText));
    }
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
        <View style={styles.topList}>
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

            <Button
              mode="contained"
              onPress={handleOnCompare}
              loading={isSimilarityAnalysisLoading}
              disabled={isSimilarityAnalysisLoading}
            >
              Compare
            </Button>
          </View>
          <View style={styles.filtersContainer}>
            <TextInput
              label="Minimum number of seen count (default all)"
              value={minSeenText}
              onChangeText={(text) => setMinSeenText(text)}
              style={styles.keywordInput}
            />

            <Button mode="contained" onPress={handleFilterMinSeenCountResults}>
              Filter
            </Button>
          </View>
          <View style={styles.percentageContainer}>
            {similarityAnalysis && (
              <SimilarityPercentage
                similarityKeyword1={similarityAnalysis.keyword1Similarity}
                similarityKeyword2={similarityAnalysis.keyword2Similarity}
                minSeenCount={minSeen}
              />
            )}
          </View>
        </View>

        {similarityAnalysis && (
          <View style={styles.tablesContainer}>
            <View style={styles.tableContainer}>
              <SimilarityResultsTable
                selectedLink={selectedLink}
                minSeenCount={minSeen}
                similarityMap={similarityMap}
                similarityKeyword={similarityAnalysis.keyword1Similarity}
                onLinkSelect={handleOnLinkSelect}
              />
            </View>
            <View style={styles.tableContainer}>
              <SimilarityResultsTable
                selectedLink={selectedLink}
                minSeenCount={minSeen}
                similarityMap={similarityMap}
                similarityKeyword={similarityAnalysis.keyword2Similarity}
                onLinkSelect={handleOnLinkSelect}
              />
            </View>
          </View>
        )}
      </Background>
    </StatusBarView>
  );
};

const mobileStyles = StyleSheet.create({
  topList: {
    display: "flex",
    flexDirection: "column",
  },
  inputsContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  percentageContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  keywordInput: {
    marginBottom: 30,
    backgroundColor: theme.colors.surface,
  },
  filtersContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
});

const largeStyles = StyleSheet.create({
  topList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tablesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableContainer: {
    width: "49%",
  },
  filtersContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    width: "33%",
    marginBottom: 30,
  },
  inputsContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    width: "33%",
    marginBottom: 30,
  },
  percentageContainer: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    width: "33%",
    marginBottom: 30,
  },
});
