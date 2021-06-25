import React, { useState } from "react";
import { SimilarityAnalysis } from "../types";
import { similarityAnalysis as apiSimilarityAnalysis } from "../api";

type SimilarityContextType = {
  similarityAnalysis: SimilarityAnalysis | undefined;
  isSimilarityAnalysisLoading: boolean;
  compareSimilarity: (keyword1: string, keyword2: string) => Promise<void>
};

export const SimilarityContext = React.createContext<SimilarityContextType>({
  similarityAnalysis: undefined,
  isSimilarityAnalysisLoading: false,
  compareSimilarity: () => Promise.resolve()
});

export const SimilarityContainer: React.FC = ({ children }) => {
  const [similarityAnalysis, setSimilarityAnalysis] = useState<SimilarityAnalysis | undefined>(undefined);
  const [isSimilarityAnalysisLoading, setIsSimilarityAnalysisLoading] = useState<boolean>(false)

  const compareSimilarity = async (keyword1: string, keyword2: string) => {
    setIsSimilarityAnalysisLoading(true);

    try {
      setSimilarityAnalysis(await apiSimilarityAnalysis(keyword1, keyword2))
    } finally {
      setIsSimilarityAnalysisLoading(false);
    }
  };


  const contextValue = {
    similarityAnalysis,
    compareSimilarity,
    isSimilarityAnalysisLoading,
  };

  return (
    <SimilarityContext.Provider value={contextValue}>
      {children}
    </SimilarityContext.Provider>
  );
};
