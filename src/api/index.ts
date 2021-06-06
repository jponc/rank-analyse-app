import Constants from "expo-constants";
import {
  Crawl,
  Result,
  ResultLink,
  ResultInfo,
  GetCrawlsResponse,
  GetCrawlResponse,
  GetResultsResponse,
  GetResultInfoResponse,
  GetResultLinksResponse,
  APICrawl,
  APIResult,
  APIResultLink,
  APIResultInfo,
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

export const fetchResultLinks = async(resultId: string): Promise<ResultLink[]> => {
  const res = await fetch(`${baseUrl}/results/${resultId}/links`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const jsonData: GetResultLinksResponse = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch result links for result: ${resultId}`);
  }

  return jsonData.data.map(normaliseResultLink);
}

export const fetchResultInfo = async(resultId: string): Promise<ResultInfo> => {
  const res = await fetch(`${baseUrl}/results/${resultId}/info`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const jsonData: GetResultInfoResponse = await res.json();

  if (!res.ok) {
    throw new Error(`failed to fetch result info for result: ${resultId}`);
  }

  return normaliseResultInfo(jsonData.data)
}

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

const normaliseResultLink = (r: APIResultLink): ResultLink => ({
  id: r.id,
  resultId: r.result_id,
  text: r.text,
  linkUrl: r.link_url,
  createdAt: new Date(r.created_at)
});

const normaliseResultInfo = (r: APIResultInfo): ResultInfo => ({
  id: r.id,
  resultId: r.result_id,
  title: r.title,
  content: r.content,
  createdAt: new Date(r.created_at)
});
