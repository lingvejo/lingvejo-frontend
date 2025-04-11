import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import { handleError } from '@/utils/errorHandler';

const GET_PLANET_QUESTS = gql`
  query GetPlanetQuests($settlementId: Int!) {
    planetQuest(where: { settlementId: { _eq: $settlementId } }) {
      questId
      type
      title
      content
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

    return data.planetQuest || [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
