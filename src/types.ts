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

// Internal Types
export type Crawl = {
  id: string;
  keyword: string;
  searchEngine: string;
  device: string;
  done: boolean;
  createdAt: Date;
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

export type ResultLink = {
  id: string;
  resultId: string;
  text: string;
  linkUrl: string;
  createdAt: Date;
};

export type ResultInfo = {
  id: string;
  resultId: string;
  title: string;
  content: string;
  createdAt: Date;
};

// Response Types
export type GetCrawlsResponse = {
  data: APICrawl[];
};

export type GetCrawlResponse = {
  data: APICrawl;
};

export type GetResultsResponse = {
  data: APIResult[];
};

export type GetResultInfoResponse = {
  data: APIResultInfo;
};

export type GetResultLinksResponse = {
  data: APIResultLink[];
};

// API Types
export type APICrawl = {
  id: string;
  keyword: string;
  search_engine: string;
  device: string;
  done: boolean;
  created_at: string;
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

export type APIResultLink = {
  id: string;
  result_id: string;
  text: string;
  link_url: string;
  created_at: string;
};

export type APIResultInfo = {
  id: string;
  result_id: string;
  title: string;
  content: string;
  created_at: string;
};
