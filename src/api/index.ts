import Constants from "expo-constants";
import {
  Crawl,
  GetCrawlsResponse,
  GetCrawlResponse,
  APICrawl,
  Result,
  APIResult,
  GetResultsResponse,
} from "../types";

const baseUrl = Constants.manifest.extra!.apiBaseURL;

export const fetchCrawls = async (): Promise<Crawl[]> => {
  const res = await fetch(`${baseUrl}/crawls`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const jsonData: GetCrawlsResponse = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch crawls`);
  }

  return jsonData.data.map(normaliseCrawl);
};

export const fetchCrawl = async (crawlId: string): Promise<Crawl> => {
  const res = await fetch(`${baseUrl}/crawls/${crawlId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const jsonData: GetCrawlResponse = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch crawl ${crawlId}`);
  }

  return normaliseCrawl(jsonData.data);
};

export const fetchResults = async (crawlId: string): Promise<Result[]> => {
  const res = await fetch(`${baseUrl}/results?crawl_id=${crawlId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const jsonData: GetResultsResponse = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch results for crawl: ${crawlId}`);
  }

  return jsonData.data.map(normaliseResult);
};

const normaliseCrawl = (c: APICrawl): Crawl => ({
  id: c.id,
  keyword: c.keyword,
  searchEngine: c.search_engine,
  device: c.device,
  done: c.done,
  createdAt: new Date(c.created_at),
});

const normaliseResult = (r: APIResult): Result => ({
  id: r.id,
  crawlId: r.crawl_id,
  link: r.link,
  title: r.title,
  description: r.description,
  position: r.position,
  done: r.done,
  isError: r.is_error,
  createdAt: new Date(r.created_at)
});
