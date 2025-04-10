import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_PLANET_CONTINENTS = gql`
  query GetPlanetContinents($planetId: Int!) {
    planetContinent(where: { planetId: { _eq: $planetId } }) {
      continentId
      name
      description
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

    return data.planetContinent || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
