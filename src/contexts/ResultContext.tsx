import React, { useEffect, useState } from "react";
import { Result } from "../types";
import { fetchResults } from "../api";

type ResultContextType = {
  results: Result[];
  changeCrawlId: (id: string) => void;
  isLoading: boolean;
};

export const ResultContext = React.createContext<ResultContextType>({
  results: [],
  changeCrawlId: () => {},
  isLoading: false,
});

export const ResultContainer: React.FC = ({ children }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [crawlId, setCrawlId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeCrawlId = (id: string) => {
    setCrawlId(id);
  }

  useEffect(() => {
    (async() => {
      if (!crawlId) {
        return;
      }
      setIsLoading(true);
      const newResults = await fetchResults(crawlId);
      setResults(newResults);
      setIsLoading(false);
    })();
  }, [crawlId])


  const contextValue = {
    results,
    changeCrawlId,
    isLoading
  };

  return (
    <ResultContext.Provider value={contextValue}>
      {children}
    </ResultContext.Provider>
  );
};
