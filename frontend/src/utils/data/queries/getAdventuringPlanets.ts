import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_ADVENTURING_PLANETS = gql`
  query GetAdventuringPlanets($voyagerId: Int!) {
    adventureProgress(
      where: { userId: { _eq: $voyagerId } }
      order_by: { completedAt: desc }
    ) {
      planet {
        id
        name
        iso
      }
      planetQuest {
        name
      }
      planetSettlement {
        name
      }
      completedAt
    }
  }
`;

export async function getAdventuringPlanets(voyagerId: number): Promise<
  {
    planetId: number;
    planetName: string;
    iso: string;
    latestQuest: string;
    settlementName: string;
    completedAt: string;
  }[]
> {
  try {
    const { data } = await client.query({
      query: GET_ADVENTURING_PLANETS,
      variables: { voyagerId },
      fetchPolicy: "no-cache",
    });

    const seenPlanets = new Set<number>();
    const result = [];

    for (const progress of data.adventureProgress) {
      const planetId = progress.planet.id;

      if (!seenPlanets.has(planetId)) {
        seenPlanets.add(planetId);
        result.push({
          planetId,
          planetName: progress.planet.name,
          iso: progress.planet.iso,
          latestQuest: progress.planetQuest?.name ?? "Unknown quest",
          settlementName: progress.planetSettlement?.name ?? "Unknown settlement",
          completedAt: progress.completedAt,
        });
      }
    }

    return result;
  } catch (error) {
    handleError(error);
    return [];
  }
}
