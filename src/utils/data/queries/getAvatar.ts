import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_AVATAR = gql`
  query GetVoyagerAvatar($voyagerId: Int!) {
    voyager(where: { id: { _eq: $voyagerId } }) {
      avatar
    }
  }
`;

export async function getAvatar(voyagerId: number): Promise<Record<string, any> | null> {
  try {
    const { data } = await client.query({
      query: GET_AVATAR,
      variables: { voyagerId },
      fetchPolicy: "no-cache", // optional: ensures fresh data
    });

    return data?.voyager?.[0]?.avatar ?? null;
  } catch (error) {
    handleError(error);
    return null;
  }
}
