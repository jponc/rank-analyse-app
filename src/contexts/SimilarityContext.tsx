import React, { useState, useEffect } from "react";
import { SimilarityAnalysis } from "../types";
import { similarityAnalysis as apiSimilarityAnalysis, similarityAnalysisBatch, similarityAnalysisBatchStatus } from "../api";
import { useInterval } from "../hooks/useInterval";

const BATCH_CHECK_INTERVAL = 5000; // 5 seconds

type SimilarityContextType = {
  similarityAnalysis: SimilarityAnalysis | undefined;
  similarityMap: SimilarityMapType,
  isSimilarityAnalysisLoading: boolean;
  compareSimilarity: (keyword1: string, keyword2: string) => Promise<void>;
};

export const SimilarityContext = React.createContext<SimilarityContextType>({
  similarityAnalysis: undefined,
  similarityMap: {},
  isSimilarityAnalysisLoading: false,
  compareSimilarity: () => Promise.resolve(),
});

export type SimilarityMapType = { [k: string]: number };

export const SimilarityContainer: React.FC = ({ children }) => {
  const [similarityAnalysis, setSimilarityAnalysis] = useState<
    SimilarityAnalysis | undefined
  >(undefined);
  const [
    isSimilarityAnalysisLoading,
    setIsSimilarityAnalysisLoading,
  ] = useState<boolean>(false);
  const [similarityMap, setSimilarityMap] = useState<SimilarityMapType>({});
  const [batchId, setBatchId] = useState<string>("");

  const compareSimilarity = async (keyword1: string, keyword2: string) => {
    setIsSimilarityAnalysisLoading(true);
    setBatchId(await similarityAnalysisBatch(keyword1, keyword2))
  };

  useInterval(() => {
    if (batchId === "") {
      return;
    }

    (async() => {

      try {
        setSimilarityAnalysis(await similarityAnalysisBatchStatus(batchId))
        setBatchId("")
        setIsSimilarityAnalysisLoading(false);
      } catch (e) {
        console.log(e.message)
      }
    })();
  }, BATCH_CHECK_INTERVAL);

  useEffect(() => {
    if (similarityAnalysis === undefined) {
      return;
    }

    const m: SimilarityMapType = {};

    similarityAnalysis.keyword1Similarity.results.forEach((r) => {
      m[r.link] = 1;
    });

    similarityAnalysis.keyword2Similarity.results.forEach((r) => {
      if (m[r.link]) {
        m[r.link] = m[r.link] + 1;
      } else {
        m[r.link] = 1;
      }
    });

    setSimilarityMap(m);


  }, [similarityAnalysis]);

  const contextValue = {
    similarityAnalysis,
    similarityMap,
    compareSimilarity,
    isSimilarityAnalysisLoading,
  };

  return (
    <SimilarityContext.Provider value={contextValue}>
      {children}
    </SimilarityContext.Provider>
  );
};
