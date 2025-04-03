import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_MODULES_QUERY = gql`
  query getModules(
    $planetId: Int!
    $stepId: Int!
    $unitId: Int!
    $lessonId: Int!
  ) {
    modules(
      where: {
        planetId: { _eq: $planetId }
        stepId: { _eq: $stepId }
        unitId: { _eq: $unitId }
        lessonId: { _eq: $lessonId }
      }
    ) {
      id
      type
      title
      content
    }
  }
`;

interface Module {
  id: number;
  type: string;
  title: string;
  content: string | null;
}

export const getModules = async (
  planetId: number,
  stepId: number,
  unitId: number,
  lessonId: number
): Promise<Module[]> => {
  try {
    const { data } = await client.query({
      query: GET_MODULES_QUERY,
      variables: { planetId, stepId, unitId, lessonId },
    });

    return (
      data?.modules.map(({ id, type, title, content }: Module) => ({
        id,
        type,
        title,
        content: content ?? null,
      })) || []
    );
  } catch (error) {
    handleError(error);
    return [];
  }
};
