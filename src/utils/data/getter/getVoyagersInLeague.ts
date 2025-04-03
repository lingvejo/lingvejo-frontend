import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_VOYAGERS_IN_LEAGUE = gql`
  query GetVoyagersInLeague($minXP: Int!, $maxXP: Int!) {
    voyager(where: { totalXP: { _gte: $minXP, _lte: $maxXP } }) {
      id
      username # ✅ Use 'username' instead of 'name'
    }
  }
`;

export async function getVoyagersInLeague(minXP: number, maxXP: number): Promise<{ id: number; username: string }[]> {
  try {
    const { data } = await client.query({
      query: GET_VOYAGERS_IN_LEAGUE,
      variables: { minXP, maxXP },
    });

    return data?.voyager ?? []; // ✅ Returns full objects instead of just `username`
  } catch (error) {
    handleError(error);
    return [];
  }
}
