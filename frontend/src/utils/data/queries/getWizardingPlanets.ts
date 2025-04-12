import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_WIZARDING_PLANETS = gql`
  query GetWizardingPlanets($uid: uuid!) {
    wizardRank(where: { uid: { _eq: $uid } }) {
      level
      planet {
        id
        name
        iso
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

    return data.wizardRank.map((entry: any) => ({
      planetId: entry.planet.id,
      planetName: entry.planet.name,
      iso: entry.planet.iso,
      level: entry.level,
    }));
  } catch (error) {
    handleError(error);
    return [];
  }
}
