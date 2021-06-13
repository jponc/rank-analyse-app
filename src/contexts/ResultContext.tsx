import React, { useContext, useEffect, useState } from "react";
import { Result, ResultLink, ResultInfo } from "../types";
import { fetchResults, fetchResultInfo, fetchResultLinks } from "../api";
import { CrawlContext } from "./CrawlContext";

type ResultContextType = {
  results: Result[];
  resultLinks: ResultLink[];
  resultInfo: ResultInfo | undefined;
  changeSelectedResultId: (id: string) => void;
  isResultsLoading: boolean;
  isResultLinksLoading: boolean;
  isResultInfoLoading: boolean;
};

export const ResultContext = React.createContext<ResultContextType>({
  results: [],
  resultLinks: [],
  resultInfo: undefined,
  changeSelectedResultId: () => {},
  isResultsLoading: false,
  isResultLinksLoading: false,
  isResultInfoLoading: false,
});

export const ResultContainer: React.FC = ({ children }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [resultLinks, setResultLinks] = useState<ResultLink[]>([]);
  const [resultInfo, setResultInfo] = useState<ResultInfo | undefined>(
    undefined
  );
  const [selectedResultId, setSelectedResultId] = useState<string | undefined>(
    undefined
  );
  const [isResultsLoading, setIsResultsLoading] = useState<boolean>(true);
  const [isResultLinksLoading, setIsResultLinksLoading] = useState<boolean>(
    false
  );
  const [isResultInfoLoading, setIsResultInfoLoading] = useState<boolean>(
    false
  );

  const { selectedCrawl } = useContext(CrawlContext)

  const changeSelectedResultId = (id: string) => {
    setSelectedResultId(id);
  };

  // Fetch results when crawl changes
  useEffect(() => {
    (async () => {
      if (!selectedCrawl) {
        return;
      }
      setIsResultsLoading(true);
      setResults(await fetchResults(selectedCrawl.id));
      setIsResultsLoading(false);
    })();
  }, [selectedCrawl]);

  // set selectedResultId to undefined when crawlId changes
  useEffect(() => {
    setSelectedResultId(undefined);
  }, [selectedCrawl]);

  // Update result links
  useEffect(() => {
    (async () => {
      if (!selectedResultId) {
        setResultLinks([]);
        return;
      }

      setIsResultLinksLoading(true);
      setResultLinks(await fetchResultLinks(selectedResultId));
      setIsResultLinksLoading(false);
    })();
  }, [selectedResultId]);

  //Update result info
  useEffect(() => {
    (async () => {
      if (!selectedResultId) {
        setResultInfo(undefined);
        return;
      }

      setIsResultInfoLoading(true);
      setResultInfo(await fetchResultInfo(selectedResultId));
      setIsResultInfoLoading(false);
    })();
  }, [selectedResultId]);

  const contextValue = {
    results,
    resultLinks,
    resultInfo,
    changeSelectedResultId,
    isResultsLoading,
    isResultLinksLoading,
    isResultInfoLoading,
  };

  return (
    <ResultContext.Provider value={contextValue}>
      {children}
    </ResultContext.Provider>
  );
};
