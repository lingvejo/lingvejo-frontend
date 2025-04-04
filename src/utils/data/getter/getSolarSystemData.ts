import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_SOLAR_SYSTEMS_WITH_PLANETS = gql`
  query GetSolarSystemsWithPlanets {
    solarSystem {
      id
      name
      iso
      planets {
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
`;

export const getSolarSystemData = async () => {
  try {
    const { data } = await client.query({ query: GET_SOLAR_SYSTEMS_WITH_PLANETS });

    return data.solarSystem ?? []; // Ensure it always returns an array
  } catch (error) {
    handleError(error);
    return [];
  }
};
