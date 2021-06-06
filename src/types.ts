import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Crawls: undefined;
  Crawl: {
    id: string;
  };
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

// Crawl
export type CrawlScreenRouteProp = RouteProp<RootStackParamList, "Crawl">;
export type CrawlScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Crawl"
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
};

export type Result = {
  id: string;
  crawlId: string;
  link: string;
  title: string;
  description: string;
  position: number;
  done: boolean;
  isError: boolean;
  createdAt: Date;
};

export type APIResult = {
  id: string;
  crawl_id: string;
  link: string;
  title: string;
  description: string;
  position: number;
  done: boolean;
  is_error: boolean;
  created_at: string;
};

export type GetResultsResponse = {
  data: APIResult[];
};
