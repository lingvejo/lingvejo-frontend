import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_WIZARDING_PLANETS = gql`
  query GetWizardingPlanets($uid: UUID!) {
    allWizardRanks(condition: { uid: $uid }) {
      nodes {
        level
        planetByPlanetId {
          id
          name
          iso
        }
      }
    }
  }
`;

export async function getWizardingPlanets(uid: string): Promise<
  {
    planetId: number;
    planetName: string;
    iso: string;
    level: number;
  }[]
> {
  try {
    const { data } = await client.query({
      query: GET_WIZARDING_PLANETS,
      variables: { uid },
      fetchPolicy: "no-cache",
    });

    return data.allWizardRanks.nodes.map((entry: any) => ({
      planetId: entry.planetByPlanetId.id,
      planetName: entry.planetByPlanetId.name,
      iso: entry.planetByPlanetId.iso,
      level: entry.level,
    }));
  } catch (error) {
    handleError(error);
    return [];
  }
}
