import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Crawls: undefined;
};

// Home
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

// Crawls
export type CrawlsScreenRouteProp = RouteProp<RootStackParamList, "Crawls">;
export type CrawlsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Crawls"
>;

export type Crawl = {
  id: string;
  keyword: string;
  searchEngine: string;
  device: string;
  done: boolean;
  createdAt: Date;
};

export type APICrawl = {
  id: string;
  keyword: string;
  search_engine: string;
  device: string;
  done: boolean;
  created_at: string;
};

export type GetCrawlsResponse = {
  data: APICrawl[];
};

export type GetCrawlResponse = {
  data: APICrawl;
}
