import React from "react";
import { View, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import { SimilarityKeyword, SimilarityResult } from "../types";

type Props = {
  similarityKeyword1: SimilarityKeyword;
  similarityKeyword2: SimilarityKeyword;
};

type Percentage = {
  topPercentage: number;
  remainingPercentage: number;
};

export const SimilarityPercentage: React.FC<Props> = ({
  similarityKeyword1,
  similarityKeyword2,
}) => {
  const { topPercentage: allTopPercentage } = getSimilarityPercentage(
    similarityKeyword1.results,
    similarityKeyword2.results,
    100
  );

  const {
    topPercentage: top5Percentage,
    remainingPercentage: remaining5Percentage,
  } = getSimilarityPercentage(
    similarityKeyword1.results,
    similarityKeyword2.results,
    5
  );

  const {
    topPercentage: top10Percentage,
    remainingPercentage: remaining10Percentage,
  } = getSimilarityPercentage(
    similarityKeyword1.results,
    similarityKeyword2.results,
    10
  );

  const {
    topPercentage: top20Percentage,
    remainingPercentage: remaining20Percentage,
  } = getSimilarityPercentage(
    similarityKeyword1.results,
    similarityKeyword2.results,
    20
  );

  const {
    topPercentage: top30Percentage,
    remainingPercentage: remaining30Percentage,
  } = getSimilarityPercentage(
    similarityKeyword1.results,
    similarityKeyword2.results,
    30
  );

  const {
    topPercentage: top50Percentage,
    remainingPercentage: remaining50Percentage,
  } = getSimilarityPercentage(
    similarityKeyword1.results,
    similarityKeyword2.results,
    50
  );

  return (
    <View style={styles.container}>
      <Paragraph>All: {allTopPercentage}%</Paragraph>
      <Paragraph>
        Top 5: {top5Percentage}% (last 95: {remaining5Percentage}%)
      </Paragraph>
      <Paragraph>
        Top 10: {top10Percentage}% (last 90: {remaining10Percentage}%)
      </Paragraph>
      <Paragraph>
        Top 20: {top20Percentage}% (last 80: {remaining20Percentage}%)
      </Paragraph>
      <Paragraph>
        Top 30: {top30Percentage}% (last 70: {remaining30Percentage}%)
      </Paragraph>
      <Paragraph>
        Top 50: {top50Percentage}% (last 50: {remaining50Percentage}%)
      </Paragraph>
    </View>
  );
};

const getSimilarityPercentage = (
  results1: SimilarityResult[],
  results2: SimilarityResult[],
  topN: number
): Percentage => {
  const results1Top = results1.slice(0, topN);
  const results2Top = results2.slice(0, topN);
  const results1Remaining = results1.slice(topN, results1.length);
  const results2Remaining = results2.slice(topN, results2.length);

  const topTemp: { [k: string]: boolean } = {};
  const remainingTemp: { [k: string]: boolean } = {};

  results1Top.forEach((r) => {
    topTemp[r.link] = true;
  });

  results1Remaining.forEach((r) => {
    remainingTemp[r.link] = true;
  });

  let topCount = 0;
  let remainingCount = 0;

  results2Top.forEach((r) => {
    if (topTemp[r.link]) {
      topCount++;
    }
  });

  results2Remaining.forEach((r) => {
    if (remainingTemp[r.link]) {
      remainingCount++;
    }
  });

  const topPercentage = topCount / topN;
  const remainingPercentage =
    remainingCount /
    Math.max(results1Remaining.length, results2Remaining.length);

  return {
    topPercentage: Math.round(topPercentage * 100),
    remainingPercentage: Math.round(remainingPercentage * 100),
  };
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
