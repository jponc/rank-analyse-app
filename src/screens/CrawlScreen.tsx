import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Title } from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import { CrawlContext } from "../contexts/CrawlContext";
import { ResultContext } from "../contexts/ResultContext";
import { CrawlScreenNavigationProp, CrawlScreenRouteProp } from "../types";
import { CrawlChips } from "../components/CrawlChips";
import { ResultsTable } from "../components/ResultsTable";

type Props = {
  route: CrawlScreenRouteProp;
  navigation: CrawlScreenNavigationProp;
};

export const CrawlScreen: React.FC<Props> = ({ navigation, route }) => {
  const { setSelectedCrawlId, selectedCrawl } = useContext(CrawlContext);
  const { results, isResultsLoading } = useContext(ResultContext);
  const { id } = route.params;

  useEffect(() => {
    setSelectedCrawlId(id);
  }, [id]);

  const handleOnResultPress = (resultId: string) => {
    navigation.push("Result", { id: resultId });
  };

  const title = selectedCrawl ? selectedCrawl.keyword : "Loading...";

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Crawls")} />
        <Appbar.Content title={title} />
      </Appbar>
      <Background justifyContent="flex-start">
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title>Crawl Information</Title>
          </View>
          <View style={styles.crawlChipsContainer}>
            {selectedCrawl ? (
              <CrawlChips crawl={selectedCrawl} />
            ) : (
              <ActivityIndicator animating={true} />
            )}
          </View>
          <View style={styles.titleContainer}>
            <Title>Results</Title>
          </View>
          <View style={styles.resultsTableContainer}>
            {isResultsLoading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <ResultsTable results={results} onPress={handleOnResultPress} />
            )}
          </View>
        </View>
      </Background>
    </StatusBarView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  resultsTableContainer: {
    maxHeight: 500,
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
  crawlChipsContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
});
