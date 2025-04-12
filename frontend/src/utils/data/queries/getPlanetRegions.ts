import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import { handleError } from '@/utils/errorHandler';

const GET_PLANET_REGIONS = gql`
  query GetPlanetRegions($continentId: Int!) {
    planetRegion(where: { continentId: { _eq: $continentId } }) {
      regionId
      name
      description
      planetSettlements {
        settlementId
        name
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

    return data.planetRegion || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}

