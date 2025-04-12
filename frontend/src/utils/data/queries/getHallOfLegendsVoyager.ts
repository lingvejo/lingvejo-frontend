import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_HALL_OF_LEGENDS_BY_VOYAGER = gql`
  query getHallOfLegendsVoyager($uid: uuid!) {
    hallOfLegendsVoyager(where: { uid: { _eq: $uid } }) {
      legendId
      hallOfLegend {
        name
        description
        category
        rarity
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
    const { data } = await client.query({
      query: GET_HALL_OF_LEGENDS_BY_VOYAGER,
      variables: { uid },
    });

    return data?.hallOfLegendsVoyager?.map((entry: any) => ({
      legendId: entry.legendId,
      name: entry.hallOfLegend.name,
      description: entry.hallOfLegend.description,
      category: entry.hallOfLegend.category,
      rarity: entry.hallOfLegend.rarity,
    })) ?? [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
