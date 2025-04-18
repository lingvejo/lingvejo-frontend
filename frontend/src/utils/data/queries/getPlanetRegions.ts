import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import { handleError } from '@/utils/errorHandler';

// Updated query based on the pattern
const GET_PLANET_REGIONS = gql`
  query GetPlanetRegions($continentId: Int!) {
    allPlanetRegions(condition: {continentId: $continentId}) {
      nodes {
        regionId
        name
        description
        planetSettlementsByRegionId {
          nodes {
            settlementId
            name
          }
        }
      }
    }
  }
`;

export async function getPlanetRegions(continentId: number) {
  try {
    const { data } = await client.query({
      query: GET_PLANET_REGIONS,
      variables: { continentId },
      fetchPolicy: 'no-cache',
    });

    // Return the regions or an empty array if no data is found
    return data.allPlanetRegions?.nodes || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
