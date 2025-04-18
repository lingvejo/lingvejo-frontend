import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_ADVENTURING_PLANETS = gql`
  query GetAdventuringPlanets($uid: UUID!) {
    allAdventureProgresses(condition: { uid: $uid }, orderBy: COMPLETED_AT_DESC) {
      nodes {
        planetByPlanetId {
          id
          name
          iso
        }
        planetQuestByQuestId {
          title
        }
        planetSettlementBySettlementId {
          name
        }
        completedAt
      }
    }
  }
`;

export async function getAdventuringPlanets(uid: string): Promise<
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
      variables: { uid },
      fetchPolicy: "no-cache",
    });

    const seenPlanets = new Set<number>();
    const result = [];

    for (const progress of data.allAdventureProgresses.nodes) {
      const planet = progress.planetByPlanetId;
      const planetId = planet.id;

      if (!seenPlanets.has(planetId)) {
        seenPlanets.add(planetId);
        result.push({
          planetId,
          planetName: planet.name,
          iso: planet.iso,
          latestQuest: progress.planetQuestByPlanetQuestId?.title ?? "Unknown quest",
          settlementName: progress.planetSettlementByPlanetSettlementId?.name ?? "Unknown settlement",
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
