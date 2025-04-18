import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Updated query using condition instead of where
const GET_PLANET_CONTINENTS = gql`
  query GetPlanetContinents($planetId: Int!) {
    allPlanetContinents(condition: { planetId: $planetId }) {
      nodes {
        continentId
        name
        description
      }
    }
  }
`;

export async function getPlanetContinents(planetId: number) {
  try {
    const { data } = await client.query({
      query: GET_PLANET_CONTINENTS,
      variables: { planetId },
      fetchPolicy: "no-cache", // Adjust this as needed
    });

    // Return the continents or an empty array if no data is found
    return data.allPlanetContinents?.nodes || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
