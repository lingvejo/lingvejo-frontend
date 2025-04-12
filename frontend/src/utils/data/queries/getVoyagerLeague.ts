import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Define the GraphQL query to fetch the voyager's XP
const GET_VOYAGER_XP = gql`
  query GetVoyagerXP($uid: uuid!) {
    voyager(where: { uid: { _eq: $uid } }) {
      totalXP
    }
  }
`;

// Define the GraphQL query to fetch the league based on XP
const GET_LEAGUE_BY_XP = gql`
  query GetLeagueByXP($xp: Int!) {
    league(where: { minXP: { _lte: $xp }, maxXP: { _gte: $xp } }) {
      name
    }
  }
`;

export async function getVoyagerLeague(uid: string): Promise<string> {
  try {
    // Fetch the totalXP of the voyager
    const { data: voyagerData } = await client.query({
      query: GET_VOYAGER_XP,
      variables: { uid },
    });

    const xp = voyagerData?.voyager?.[0]?.totalXP ?? 0;

    // Fetch the league based on the totalXP
    const { data: leagueData } = await client.query({
      query: GET_LEAGUE_BY_XP,
      variables: { xp },
    });

    // Return the league name or "Unknown" if no league found
    return leagueData?.league?.[0]?.name ?? "Unknown";
  } catch (error) {
    handleError(error);
    return "Unknown";
  }
}
