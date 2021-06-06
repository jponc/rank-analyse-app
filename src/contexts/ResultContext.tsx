import React, { useEffect, useState } from "react";
import { Result, ResultLink, ResultInfo } from "../types";
import { fetchResults, fetchResultInfo, fetchResultLinks } from "../api";

type ResultContextType = {
  results: Result[];
  resultLinks: ResultLink[];
  resultInfo: ResultInfo | undefined;
  changeCrawlId: (id: string) => void;
  changeSelectedResultId: (id: string) => void;
  selectedResultUrl: string;
  isResultsLoading: boolean;
  isResultLinksLoading: boolean;
  isResultInfoLoading: boolean;
};

export const ResultContext = React.createContext<ResultContextType>({
  results: [],
  resultLinks: [],
  resultInfo: undefined,
  changeCrawlId: () => {},
  changeSelectedResultId: () => {},
  selectedResultUrl: "",
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
  const [crawlId, setCrawlId] = useState<string | undefined>(undefined);
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
  // NOTE: Workaround because ResultInfo doesn't provide the url
  const [selectedResultUrl, setSelectedResultUrl] = useState<string>("");

  const changeCrawlId = (id: string) => {
    setCrawlId(id);
  };

  const changeSelectedResultId = (id: string) => {
    setSelectedResultId(id);
  };

  // Fetch results when crawlId changes
  useEffect(() => {
    (async () => {
      if (!crawlId) {
        return;
      }
      setIsResultsLoading(true);
      setResults(await fetchResults(crawlId));
      setIsResultsLoading(false);
    })();
  }, [crawlId]);

  // set selectedResultId to undefined when crawlId changes
  useEffect(() => {
    setSelectedResultId(undefined);
  }, [crawlId]);

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

  // Update selected result link (workaround)
  useEffect(() => {
    if (!selectedResultId) {
      return;
    }

    const result = results.find((r) => r.id === selectedResultId);
    if (!result) {
      return;
    }

    setSelectedResultUrl(result.link);
  }, [selectedResultId]);

  const contextValue = {
    results,
    resultLinks,
    resultInfo,
    changeCrawlId,
    changeSelectedResultId,
    isResultsLoading,
    isResultLinksLoading,
    isResultInfoLoading,
    selectedResultUrl,
  };

  return (
    <ResultContext.Provider value={contextValue}>
      {children}
    </ResultContext.Provider>
  );
};
