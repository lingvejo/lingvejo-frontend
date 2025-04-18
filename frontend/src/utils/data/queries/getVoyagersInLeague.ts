import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Updated GraphQL query to fetch voyagers in a league based on XP range
const GET_VOYAGERS_IN_LEAGUE = gql`
  query GetVoyagersInLeague($minXp: Int!, $maxXp: Int!) {
    allVoyagers(
      filter: { totalXp: { greaterThanOrEqualTo: $minXp, lessThanOrEqualTo: $maxXp } }
      orderBy: TOTAL_XP_ASC
    ) {
      nodes {
        uid
        persona
        avatar
      }
    }
  }
`;

export async function getVoyagersInLeague(minXp: number, maxXp: number): Promise<{ uid: string; persona: string; avatar: string }[]> {
  try {
    const { data } = await client.query({
      query: GET_VOYAGERS_IN_LEAGUE,
      variables: { minXp, maxXp },
    });

    return data?.allVoyagers?.nodes ?? [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
