import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_UNITS_QUERY = gql`
  query GetUnits($planetId: Int!, $sectionId: Int!) {
    planet(where: { id: { _eq: $planetId } }) {
      sections(where: { id: { _eq: $sectionId } }) {
        units {
          id
          title
          description
          lessons {
            id
            title
            modules {
              id
              type
              title
              content
            }
          }
        }
      }
    }
  }
`;

interface Module {
  id: number;
  type: string;
  title: string;
  content: string;
}

interface Lesson {
  id: number;
  title: string;
  modules: Module[];
}

interface Unit {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const getUnits = async (planetId: number, sectionId: number): Promise<Unit[]> => {
  try {
    const { data } = await client.query({
      query: GET_UNITS_QUERY,
      variables: { planetId, sectionId },
    });

    // Ensure we extract the units array correctly, handling potential undefined values
    return data?.planet?.[0]?.sections?.[0]?.units ?? [];
  } catch (error) {
    handleError(error);
    return []; // Always return an empty array on error
  }
};
