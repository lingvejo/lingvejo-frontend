import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";
import { Voyager } from "@/contexts/VoyagerContext";

const GET_VOYAGER = gql`
  query GetVoyager($uid: UUID!) {
    voyagerByUid(uid: $uid) {
      uid
      username
      persona
      currentPlanet
      totalXp
      completedTutorial
      avatar
    }
  }
`;

export async function getVoyager(uid: string): Promise<Voyager | null> {
  try {
    const { data } = await client.query({
      query: GET_VOYAGER,
      variables: { uid },
    });

    return data?.voyagerByUid ?? null;
  } catch (error) {
    handleError(error);
    return null;
  }
}
