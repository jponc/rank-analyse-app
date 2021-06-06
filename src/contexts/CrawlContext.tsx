import React, { useState } from "react";
import { Crawl } from "../types";
import { fetchCrawl, fetchCrawls } from "../api";

type CrawlContextType = {
  crawls: Crawl[];
  loadCrawls: () => Promise<void>;
  getCrawl: (crawlId: string) => Promise<Crawl | undefined>
};

export const CrawlContext = React.createContext<CrawlContextType>({
  crawls: [],
  loadCrawls: () => Promise.resolve(),
  getCrawl: () => Promise.resolve(undefined)
});

export const CrawlContainer: React.FC = ({ children }) => {
  const [crawls, setCrawls] = useState<Crawl[]>([]);

  const loadCrawls = async () => {
    const newCrawls = await fetchCrawls();
    setCrawls(newCrawls);
  };

  const getCrawl = async (crawlId: string): Promise<Crawl> => {
    const crawl = crawls.find(c => c.id === crawlId)

    if (crawl) {
      return crawl
    }

    const fetchedCrawl = await fetchCrawl(crawlId)
    setCrawls([...crawls, fetchedCrawl]);

    return fetchedCrawl;
  }

  const contextValue = {
    crawls,
    loadCrawls,
    getCrawl
  };

  return (
    <CrawlContext.Provider value={contextValue}>
      {children}
    </CrawlContext.Provider>
  );
};
