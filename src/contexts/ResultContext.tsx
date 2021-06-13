import React, { useContext, useEffect, useState } from "react";
import { Result, ResultLink, ResultInfo, ResultEntity, ResultTopic } from "../types";
import { fetchResult, fetchResults, fetchResultInfo, fetchResultLinks, fetchResultTopics, fetchResultEntities } from "../api";
import { CrawlContext } from "./CrawlContext";

type ResultContextType = {
  results: Result[];
  resultLinks: ResultLink[];
  resultEntities: ResultEntity[];
  resultTopics: ResultTopic[];
  resultInfo: ResultInfo | undefined;
  setSelectedResultId: (id: string) => void;
  selectedResult: Result | undefined;
  isResultsLoading: boolean;
  isResultLinksLoading: boolean;
  isResultInfoLoading: boolean;
  isResultEntitiesLoading: boolean;
  isResultTopicsLoading: boolean;
};

export const ResultContext = React.createContext<ResultContextType>({
  results: [],
  resultLinks: [],
  resultEntities: [],
  resultTopics: [],
  resultInfo: undefined,
  setSelectedResultId: () => {},
  selectedResult: undefined,
  isResultsLoading: false,
  isResultLinksLoading: false,
  isResultInfoLoading: false,
  isResultEntitiesLoading: false,
  isResultTopicsLoading: false,
});

export const ResultContainer: React.FC = ({ children }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedResult, setSelectedResult] = useState<Result | undefined>(undefined);
  const [resultLinks, setResultLinks] = useState<ResultLink[]>([]);
  const [resultInfo, setResultInfo] = useState<ResultInfo | undefined>(
    undefined
  );

  const [resultEntities, setResultEntities] = useState<ResultEntity[]>([]);
  const [resultTopics, setResultTopics] = useState<ResultTopic[]>([]);
  const [selectedResultId, setSelectedResultId] = useState<string>(
    ""
  );
  const [isResultsLoading, setIsResultsLoading] = useState<boolean>(true);
  const [isResultTopicsLoading, setIsResultTopicsLoading] = useState<boolean>(true);
  const [isResultEntitiesLoading, setIsResultEntitiesLoading] = useState<boolean>(true);
  const [isResultLinksLoading, setIsResultLinksLoading] = useState<boolean>(
    false
  );
  const [isResultInfoLoading, setIsResultInfoLoading] = useState<boolean>(
    false
  );

  const { selectedCrawl } = useContext(CrawlContext)

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

  // update selected result when selectedResultId changes
  useEffect(() => {
    (async () => {
      if (selectedResultId === "") {
        setSelectedResult(undefined);
        return;
      }

      const result = results.find(r => r.id === selectedResultId)

      if (result) {
        setSelectedResult(result)
        return;
      }

      const fetchedResult = await fetchResult(selectedResultId)
      setSelectedResult(fetchedResult);
    })();
  }, [selectedResultId])

  // Update result links
  useEffect(() => {
    (async () => {
      if (selectedResultId === "") {
        setResultLinks([]);
        return;
      }

      setIsResultLinksLoading(true);
      setResultLinks(await fetchResultLinks(selectedResultId));
      setIsResultLinksLoading(false);
    })();
  }, [selectedResultId]);

  // Update result topics
  useEffect(() => {
    (async () => {
      if (selectedResultId === "") {
        setResultTopics([]);
        return;
      }

      setIsResultTopicsLoading(true);
      setResultTopics(await fetchResultTopics(selectedResultId));
      setIsResultTopicsLoading(false);
    })();
  }, [selectedResultId]);

  // Update result entities
  useEffect(() => {
    (async () => {
      if (selectedResultId === "") {
        setResultEntities([]);
        return;
      }

      setIsResultEntitiesLoading(true);
      setResultEntities(await fetchResultEntities(selectedResultId));
      setIsResultEntitiesLoading(false);
    })();
  }, [selectedResultId]);

  //Update result info
  useEffect(() => {
    (async () => {
      if (selectedResultId === "") {
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
    resultTopics,
    resultEntities,
    setSelectedResultId,
    selectedResult,
    isResultsLoading,
    isResultLinksLoading,
    isResultInfoLoading,
    isResultTopicsLoading,
    isResultEntitiesLoading,
  };

  return (
    <ResultContext.Provider value={contextValue}>
      {children}
    </ResultContext.Provider>
  );
};
