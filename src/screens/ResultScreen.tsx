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

type Props = {
  route: ResultScreenRouteProp;
  navigation: ResultScreenNavigationProp;
};

export const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const {
    setSelectedResultId,
    selectedResult,
    resultTopics,
    resultLinks,
    resultEntities,
  } = useContext(ResultContext);
  const [selectedView, setSelectedView] = useState<string>("analysis");
  const { id } = route.params;

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
    setSelectedResultId("")
    navigation.push("Crawl", { id: selectedResult.crawlId })
  }

  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction
          onPress={handleOnBackPress}
        />
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
            {selectedView === "analysis" ? (
              <Subheading
                style={styles.option}
                onPress={() => setSelectedView("links")}
              >
                View Links
              </Subheading>
            ) : (
              <Subheading
                style={styles.option}
                onPress={() => setSelectedView("analysis")}
              >
                View Analysis
              </Subheading>
            )}
          </View>
          <View style={styles.viewContainer}>
            {selectedView === "analysis" ? (
              <>
                <View style={styles.topicsContainer}>
                  <TopicsTable topics={resultTopics} />
                </View>
                <View style={styles.entitiesContainer}>
                  <EntitiesTable entities={resultEntities} />
                </View>
              </>
            ) : (
              <>
                <View style={styles.topicsContainer}>
                  <ResultLinksSection resultLinks={resultLinks} />
                </View>
              </>
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
  appbar: {
    top: 0,
    right: 0,
    left: 0,
  },
  titleContainer: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultContainer: {
    marginBottom: 20,
  },
  option: {
    paddingHorizontal: 10,
    color: theme.colors.primary,
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicsContainer: {
    width: "49%",
    maxHeight: 500,
  },
  entitiesContainer: {
    width: "49%",
    maxHeight: 500,
  },
});
