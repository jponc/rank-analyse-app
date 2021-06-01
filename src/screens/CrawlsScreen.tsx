import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Title} from "react-native-paper";
import Background from "../components/Background";
import { StatusBarView } from "../components/StatusBarView";
import {
  CrawlsScreenNavigationProp,
  CrawlsScreenRouteProp,
} from "../types";

type Props = {
  route: CrawlsScreenRouteProp;
  navigation: CrawlsScreenNavigationProp;
};

export const CrawlsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <StatusBarView>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.push("Home")} />
        <Appbar.Content
          title="Crawls"
        />
      </Appbar>
      <Background>
        <View>
          <Title>Hello</Title>
        </View>
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
