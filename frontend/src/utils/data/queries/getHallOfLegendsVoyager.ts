import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Define the GraphQL query to fetch Hall of Legends data
const GET_HALL_OF_LEGENDS_BY_VOYAGER = gql`
  query GetHallOfLegendsVoyager($uid: UUID!) {
    allHallOfLegendsVoyagers(condition: { uid: $uid }) {
      nodes {
        legendId
        hallOfLegendByLegendId {
          name
          description
          category
          rarity
        }
      }
    }
  }
`;

export async function getHallOfLegendsVoyager(uid: string): Promise<
  {
    legendId: number;
    name: string;
    description: string;
    category: string;
    rarity: string;
  }[]
> {
  try {
    // Query the GraphQL endpoint for Hall of Legends data
    const { data } = await client.query({
      query: GET_HALL_OF_LEGENDS_BY_VOYAGER,
      variables: { uid },
    });

    // Map the data into the desired structure
    return data?.allHallOfLegendsVoyagers?.nodes?.map((entry: any) => ({
      legendId: entry.legendId,
      name: entry.hallOfLegendByLegendId.name,
      description: entry.hallOfLegendByLegendId.description,
      category: entry.hallOfLegendByLegendId.category,
      rarity: entry.hallOfLegendByLegendId.rarity,
    })) ?? [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
