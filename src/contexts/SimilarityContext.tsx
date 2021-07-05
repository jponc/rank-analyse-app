import React, { useState, useEffect } from "react";
import { SimilarityAnalysis } from "../types";
import { similarityAnalysis as apiSimilarityAnalysis } from "../api";

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

  const compareSimilarity = async (keyword1: string, keyword2: string) => {
    setIsSimilarityAnalysisLoading(true);

    try {
      setSimilarityAnalysis(await apiSimilarityAnalysis(keyword1, keyword2));
    } finally {
      setIsSimilarityAnalysisLoading(false);
    }
  };

  useEffect(() => {
    if (similarityAnalysis === undefined) {
      return;
    }

    const m: SimilarityMapType = {};

    similarityAnalysis.keyword1Similarity.results.forEach((r) => {
      m[r.title] = 1;
    });

    similarityAnalysis.keyword2Similarity.results.forEach((r) => {
      if (m[r.title]) {
        m[r.title] = m[r.title] + 1;
      } else {
        m[r.title] = 1;
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
