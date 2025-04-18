import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// GraphQL query to get the avatar of a voyager by their uid
const GET_AVATAR = gql`
  query GetVoyagerAvatar($uid: UUID!) {
    voyagerByUid(uid: $uid) {
      avatar
    }
  }
`;

export async function getAvatar(uid: string): Promise<Record<string, any> | null> {
  try {
    const { data } = await client.query({
      query: GET_AVATAR, // Query remains the same name as before
      variables: { uid },
      fetchPolicy: "no-cache", // optional: ensures fresh data
    });

    // Parse the avatar JSON string to an object
    const avatar = data?.voyagerByUid?.avatar;

    // Check if avatar exists and return the parsed object, else return null
    return avatar ? JSON.parse(avatar) : null;
  } catch (error) {
    handleError(error); // Handle any errors
    return null; // Return null on error
  }
}
