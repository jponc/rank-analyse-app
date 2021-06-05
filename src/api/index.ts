import Constants from "expo-constants";
import { Crawl, GetCrawlsResponse, GetCrawlResponse, APICrawl } from "../types";

const baseUrl = Constants.manifest.extra!.apiBaseURL;

export const getCrawls = async (): Promise<Crawl[]> => {
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

export const getCrawl = async (crawlId: string): Promise<Crawl> => {
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

const normaliseCrawl = (c: APICrawl): Crawl => ({
  id: c.id,
  keyword: c.keyword,
  searchEngine: c.search_engine,
  device: c.device,
  done: c.done,
  createdAt: new Date(c.created_at),
});
