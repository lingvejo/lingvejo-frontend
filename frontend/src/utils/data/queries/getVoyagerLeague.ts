import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";
import leagueXpData from "@/constants/leagueXp.json"; // Import league data from JSON

// Define the GraphQL query to fetch the voyager's XP
const GET_VOYAGER_XP = gql`
  query GetVoyagerXP($uid: UUID!) {
    voyagerByUid(uid: $uid) {
      totalXp
    }
  }
`;

export async function getVoyagerLeague(uid: string): Promise<number> {
  try {
    // Fetch the totalXP of the voyager
    const { data: voyagerData } = await client.query({
      query: GET_VOYAGER_XP,
      variables: { uid },
    });

    // Ensure the voyager data is correctly accessed
    const xp = voyagerData?.voyagerByUid?.totalXp ?? 0;

    // Find the league based on the XP value from the local JSON
    const league = Object.entries(leagueXpData)
      .find(([key, { minXp, maxXp }]) => {
        // Check if XP falls within the range (handle null maxXp)
        return xp >= minXp && (maxXp === null || xp <= maxXp);
      });

    // Return the league name or "Unknown" if no league found
    return league ? Number(league[0]) : 1;
  } catch (error) {
    handleError(error);
    return 1;
  }
}
