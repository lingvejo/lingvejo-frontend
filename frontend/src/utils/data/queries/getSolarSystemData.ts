import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_SOLAR_SYSTEMS_WITH_PLANETS = gql`
  query GetSolarSystemsWithPlanets {
    allSolarSystems {
      nodes {
        id
        name
        iso
        planetsBySolarSystemId {
          nodes {
            id
            name
            iso
            description
            discoveredDate
            discoveredBy
            lastObservedDate
            lastObservedBy
            adventurers
            wizards
          }
        }
      }
    }
  }
`;

export const getSolarSystemData = async () => {
  try {
    const { data } = await client.query({ query: GET_SOLAR_SYSTEMS_WITH_PLANETS });

    return data?.allSolarSystems?.nodes ?? []; // Ensure it always returns an array
  } catch (error) {
    handleError(error);
    return [];
  }
};
