import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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

type Props = {
  route: CrawlScreenRouteProp;
  navigation: CrawlScreenNavigationProp;
};

export const CrawlScreen: React.FC<Props> = ({ navigation, route }) => {
  const { getCrawl } = useContext(CrawlContext);
  const { changeCrawlId, results } = useContext(ResultContext);
  const { id } = route.params;
  const [crawl, setCrawl] = useState<Crawl | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setCrawl(await getCrawl(id));
      changeCrawlId(id);
    })();
  }, [id]);

  const handleOnResultPress = (resultId: string) => {
    console.log(resultId);
  };

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Crawls")} />
        <Appbar.Content title={`Crawl ${id}`} />
      </Appbar>
      <Background justifyContent="flex-start">
        <View style={styles.container}>
          <View style={styles.left}>
            <View style={styles.crawlChipsContainer}>
              {crawl ? (
                <CrawlChips crawl={crawl} />
              ) : (
                <ActivityIndicator animating={true} />
              )}
            </View>
            <View style={styles.resultsTableContainer}>
              <ResultsTable results={results} onPress={handleOnResultPress} />
              </View>
          </View>
          <View style={styles.right}>
            <Title>test</Title>
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
    width: "100%"
  },
  resultsTableContainer: {
    maxHeight: 300
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
  left: {
    width: "50%",
  },
  right: {
    width: "50%",
  },
  crawlChipsContainer: {
    marginBottom: 20,
  },
});
