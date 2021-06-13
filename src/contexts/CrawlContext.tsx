import React, { useEffect, useState } from "react";
import { Crawl } from "../types";
import { fetchCrawl, fetchCrawls } from "../api";

type CrawlContextType = {
  crawls: Crawl[];
  loadCrawls: () => Promise<void>;
  setSelectedCrawlId: (crawlId: string) => void
  selectedCrawl: Crawl | undefined;
};

export const CrawlContext = React.createContext<CrawlContextType>({
  crawls: [],
  loadCrawls: () => Promise.resolve(),
  setSelectedCrawlId: () => Promise.resolve(),
  selectedCrawl: undefined,
});

export const CrawlContainer: React.FC = ({ children }) => {
  const [crawls, setCrawls] = useState<Crawl[]>([]);
  const [selectedCrawl, setSelectedCrawl] = useState<Crawl | undefined>(undefined);
  const [selectedCrawlId, setSelectedCrawlId] = useState<string>("");

  const loadCrawls = async () => {
    const newCrawls = await fetchCrawls();
    setCrawls(newCrawls);
  };

  useEffect(() => {
    (async () => {
      if (selectedCrawlId === "") {
        return;
      }

      const crawl = crawls.find(c => c.id === selectedCrawlId)

      if (crawl) {
        setSelectedCrawl(crawl)
        return;
      }

      const fetchedCrawl = await fetchCrawl(selectedCrawlId)
      setSelectedCrawl(fetchedCrawl);
    })();
  }, [selectedCrawlId])


  const contextValue = {
    crawls,
    loadCrawls,
    setSelectedCrawlId,
    selectedCrawl,
  };

  return (
    <CrawlContext.Provider value={contextValue}>
      {children}
    </CrawlContext.Provider>
  );
};
