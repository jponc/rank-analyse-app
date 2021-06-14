import React, { useState, useContext, useEffect } from "react";
import { ResultContext } from "../contexts/ResultContext";
import { ResultScreenNavigationProp, ResultScreenRouteProp } from "../types";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Title,
  Subheading,
} from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import { ResultSection } from "../components/ResultSection";
import { TopicsTable } from "../components/TopicsTable";
import { EntitiesTable } from "../components/EntitiesTable";
import { theme } from "../core/theme";
import { ResultLinksSection } from "../components/ResultLinksSection";
import { isLargeScreen } from "../core/screen";
import { PageContent } from "../components/PageContent";

type Props = {
  route: ResultScreenRouteProp;
  navigation: ResultScreenNavigationProp;
};

export const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const {
    setSelectedResultId,
    selectedResult,
    resultTopics,
    resultInfo,
    resultLinks,
    resultEntities,
  } = useContext(ResultContext);
  const [selectedView, setSelectedView] = useState<string>("analysis");
  const { id } = route.params;

  let styles: any = { ...mobileStyles };

  if (isLargeScreen()) {
    styles = { ...styles, ...largeStyles };
  }

  useEffect(() => {
    setSelectedResultId(id);
  }, [id]);

  if (selectedResult === undefined) {
    return (
      <StatusBarView>
        <ActivityIndicator animating={true} />
      </StatusBarView>
    );
  }

  const handleOnBackPress = () => {
    setSelectedResultId("");
    navigation.push("Crawl", { id: selectedResult.crawlId });
  };

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={handleOnBackPress} />
        <Appbar.Content title={selectedResult.title} />
      </Appbar>
      <Background justifyContent="flex-start">
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title>Result Information</Title>
          </View>
          <View style={styles.resultContainer}>
            <ResultSection result={selectedResult} />
          </View>
          <View style={styles.titleContainer}>
            <Subheading
              style={[styles.option, selectedView === "analysis" ? styles.selectedOption : {}]}
              onPress={() => setSelectedView("analysis")}
            >
              Analysis
            </Subheading>
            <Subheading
              style={[styles.option, selectedView === "links" ? styles.selectedOption : {}]}
              onPress={() => setSelectedView("links")}
            >
              Links
            </Subheading>
            <Subheading
              style={[styles.option, selectedView === "page_content" ? styles.selectedOption : {}]}
              onPress={() => setSelectedView("page_content")}
            >
              Page Content
            </Subheading>
          </View>
          <View style={styles.viewContainer}>
            {selectedView === "analysis" && (
              <>
                <View style={styles.topicsContainer}>
                  <TopicsTable topics={resultTopics} />
                </View>
                <View style={styles.entitiesContainer}>
                  <EntitiesTable entities={resultEntities} />
                </View>
              </>
            )}

            {selectedView === "links" && (
              <>
                <View style={styles.topicsContainer}>
                  <ResultLinksSection resultLinks={resultLinks} />
                </View>
              </>
            )}

            {selectedView === "page_content" && resultInfo !== undefined && (
              <>
                <View style={styles.pageContentContainer}>
                  <PageContent content={resultInfo.cleanedText} />
                </View>
              </>
            )}
          </View>
        </View>
      </Background>
    </StatusBarView>
  );
};

const mobileStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
  titleContainer: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  resultContainer: {
    marginBottom: 20,
  },
  option: {
    paddingHorizontal: 10,
  },
  selectedOption: {
    color: theme.colors.primary,
  },
  viewContainer: {
    display: "flex",
    flexDirection: "column",
  },
  topicsContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  entitiesContainer: {
    maxHeight: 300,
  },
  pageContentContainer: {
    maxHeight: 300,
    width: "100%",
  },
});

const largeStyles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicsContainer: {
    width: "49%",
    maxHeight: 500,
    marginBottom: 0,
  },
  entitiesContainer: {
    width: "49%",
    maxHeight: 500,
  },
  pageContentContainer: {
    width: "100%",
    maxHeight: 500,
  },
});
