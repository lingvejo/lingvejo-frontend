import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_AVATAR = gql`
  query GetVoyagerAvatar($uid: uuid!) {
    voyager(where: { uid: { _eq: $uid } }) {
      avatar
    }
  }
`;

export async function getAvatar(uid: string): Promise<Record<string, any> | null> {
  try {
    const { data } = await client.query({
      query: GET_AVATAR,
      variables: { uid },
      fetchPolicy: "no-cache", // optional: ensures fresh data
    });

    return data?.voyager?.[0]?.avatar ?? null;
  } catch (error) {
    handleError(error);
    return null;
  }
}
