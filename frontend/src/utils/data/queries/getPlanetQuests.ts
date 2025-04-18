import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import { handleError } from '@/utils/errorHandler';

// Updated query to match the working pattern
const GET_PLANET_QUESTS = gql`
  query GetPlanetQuests($settlementId: Int!) {
    allPlanetQuests(condition: { settlementId: $settlementId }) {
      nodes {
        questId
        title
        content
      }
    }
  }
`;

export async function getPlanetQuests(settlementId: number) {
  try {
    const { data } = await client.query({
      query: GET_PLANET_QUESTS,
      variables: { settlementId },
      fetchPolicy: 'no-cache',
    });

    // Return the quests or an empty array if no data is found
    return data.allPlanetQuests?.nodes || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
