import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_LATEST_PROGRESS_QUERY = gql`
  query getLatestProgress(
    $userId: Int!
    $planetId: Int!
    $stepId: Int!
    $unitId: Int!
    $lessonId: Int!
    $moduleId: Int!
  ) {
    adventureProgress(
      where: {
        userId: { _eq: $userId }
        planetId: { _eq: $planetId }
        stepId: { _eq: $stepId }
        unitId: { _eq: $unitId }
        lessonId: { _eq: $lessonId }
        moduleId: { _eq: $moduleId }
      }
      order_by: { lastUpdated: desc }
      limit: 1
    ) {
      unitId
      lessonId
      moduleId
    }
  }
`;

interface LatestProgress {
  unitId: number;
  lessonId: number;
  moduleId: number;
}

export const getLatestProgress = async (
  userId: number,
  planetId: number,
  stepId: number,
  unitId: number,
  lessonId: number,
  moduleId: number
): Promise<LatestProgress> => {
  try {
    const { data } = await client.query({
      query: GET_LATEST_PROGRESS_QUERY,
      variables: { userId, planetId, stepId, unitId, lessonId, moduleId },
    });

    return data?.adventureProgress?.[0] ?? { unitId, lessonId, moduleId };
  } catch (error) {
    handleError(error);
    return { unitId, lessonId, moduleId };
  }
};
