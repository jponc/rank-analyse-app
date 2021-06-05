import React, { useState } from "react";
import { Crawl } from "../types";
import { getCrawls } from "../api";

type CrawlContextType = {
  crawls: Crawl[];
  fetchCrawls: () => Promise<void>;
};

export const CrawlContext = React.createContext<CrawlContextType>({
  crawls: [],
  fetchCrawls: () => Promise.resolve(),
});

export const CrawlContainer: React.FC = ({ children }) => {
  const [crawls, setCrawls] = useState<Crawl[]>([]);

  const fetchCrawls = async () => {
    const newCrawls = await getCrawls();
    setCrawls(newCrawls);
  };

  const contextValue = {
    crawls,
    fetchCrawls,
  };

  return (
    <CrawlContext.Provider value={contextValue}>
      {children}
    </CrawlContext.Provider>
  );
};
