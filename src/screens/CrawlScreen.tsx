import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Title } from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import { CrawlContext } from "../contexts/CrawlContext";
import { ResultContext } from "../contexts/ResultContext";
import {
  CrawlScreenNavigationProp,
  CrawlScreenRouteProp,
  Crawl,
} from "../types";
import { CrawlChips } from "../components/CrawlChips";
import { ResultsTable } from "../components/ResultsTable";
import { ResultInfoSection } from "../components/ResultInfoSection";
import { ResultLinksSection } from "../components/ResultLinksSection";

type Props = {
  route: CrawlScreenRouteProp;
  navigation: CrawlScreenNavigationProp;
};

export const CrawlScreen: React.FC<Props> = ({ navigation, route }) => {
  const { getCrawl } = useContext(CrawlContext);
  const {
    changeCrawlId,
    changeSelectedResultId,
    results,
    resultInfo,
    resultLinks,
    isResultsLoading,
    isResultInfoLoading,
    isResultLinksLoading,
    selectedResultUrl,
  } = useContext(ResultContext);
  const { id } = route.params;
  const [crawl, setCrawl] = useState<Crawl | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setCrawl(await getCrawl(id));
      changeCrawlId(id);
    })();
  }, [id]);

  const handleOnResultPress = (resultId: string) => {
    changeSelectedResultId(resultId);
  };

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Crawls")} />
        <Appbar.Content title={`Crawl`} />
      </Appbar>
      <Background justifyContent="flex-start">
        <View style={styles.container}>
          <View style={styles.left}>
            <View style={styles.titleContainer}>
              <Title>Crawl Information</Title>
            </View>
            <View style={styles.crawlChipsContainer}>
              {crawl ? (
                <CrawlChips crawl={crawl} />
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
          <View style={styles.right}>
            <View style={styles.titleContainer}>
              <Title>Selected Result</Title>
            </View>
            <View style={styles.resultInfoContainer}>
              {isResultInfoLoading ? (
                <ActivityIndicator animating={true} />
              ) : (
                <ResultInfoSection
                  resultInfo={resultInfo}
                  url={selectedResultUrl}
                />
              )}
            </View>
            <View style={styles.titleContainer}>
              <Title>Links</Title>
            </View>
            <View style={styles.resultLinksContainer}>
              {isResultLinksLoading ? (
                <ActivityIndicator animating={true} />
              ) : (
                <ResultLinksSection resultLinks={resultLinks} />
              )}
            </View>
          </View>
        </View>
      </Background>
    </StatusBarView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  resultsTableContainer: {
    maxHeight: 500,
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
  left: {
    width: "49%",
  },
  right: {
    width: "49%",
  },
  crawlChipsContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  resultInfoContainer: {
    marginBottom: 20,
  },
  resultLinksContainer: {
    marginBottom: 20,
    maxHeight: 350,
  },
});
