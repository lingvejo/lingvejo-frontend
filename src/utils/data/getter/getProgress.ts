import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Query to fetch all progress data for a user on a specific planet and step
const GET_PROGRESS_QUERY = gql`
  query getProgress($userId: Int!, $planetId: Int!, $stepId: Int!) {
    adventureProgress(
      where: {
        userId: { _eq: $userId }
        planetId: { _eq: $planetId }
        stepId: { _eq: $stepId }
      }
    ) {
      unitId
      lessonId
      moduleId
      lastUpdated
    }
  }
`;

// Type definition for progress entries
interface Progress {
  unitId: number;
  lessonId: number;
  moduleId: number;
  complete: boolean;
}

// Function to fetch progress data
export const getProgress = async (
  userId: number,
  planetId: number,
  stepId: number
): Promise<Progress[]> => {
  try {
    const { data } = await client.query({
      query: GET_PROGRESS_QUERY,
      variables: { userId, planetId, stepId },
    });

    return (
      data?.adventureProgress?.map(({ unitId, lessonId, moduleId, lastUpdated }: Progress) => ({
        unitId,
        lessonId,
        moduleId,
        complete: !!lastUpdated, // If lastUpdated exists, mark as completed
      })) || []
    );
  } catch (error) {
    handleError(error);
    return [];
  }
};
