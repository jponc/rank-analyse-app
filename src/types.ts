import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Crawls: undefined;
  Crawl: {
    id: string;
  };
  Result: {
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

// Result
export type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;
export type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Result"
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
  cleanedText: string;
  createdAt: Date;
};

export type ResultTopic = {
  id: string;
  resultId: string;
  label: string;
  score: number;
};

export type ResultEntity = {
  id: string;
  resultId: string;
  entity: string;
  confidenceScore: number;
  relevanceScore: number;
  matchedText: string;
};

// Response Types
export type GetCrawlsResponse = {
  data: APICrawl[];
};

export type GetCrawlResponse = {
  data: APICrawl;
};

export type GetResultResponse = {
  data: APIResult;
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

export type GetResultEntitiesResponse = {
  data: APIResultEntity[];
};

export type GetResultTopicsResponse = {
  data: APIResultTopic[];
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
  cleaned_text: string;
  created_at: string;
};

export type APIResultEntity = {
  id: string;
  result_id: string;
  entity: string;
  confidence_score: number;
  relevance_score: number;
  matched_text: string;
};

export type APIResultTopic = {
  id: string;
  result_id: string;
  label: string;
  score: number;
};
