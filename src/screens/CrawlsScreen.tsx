import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import { CrawlContext } from "../contexts/CrawlContext";
import { CrawlsScreenNavigationProp, CrawlsScreenRouteProp } from "../types";
import { CrawlsTable } from "../components/CrawlsTable";

type Props = {
  route: CrawlsScreenRouteProp;
  navigation: CrawlsScreenNavigationProp;
};

export const CrawlsScreen: React.FC<Props> = ({ navigation }) => {
  const { crawls, loadCrawls } = useContext(CrawlContext);

  useEffect(() => {
    loadCrawls();
  }, []);

  const handleCrawlOnPress = (crawlId: string) => {
    navigation.push("Crawl", { id: crawlId });
  };

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content title="Crawls" />
      </Appbar>
      <Background>
        <ScrollView style={styles.crawlsTableContainer}>
          <CrawlsTable crawls={crawls} onPress={handleCrawlOnPress} />
        </ScrollView>
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
  crawlsTableContainer: {
    width: "70%",
  },
});
