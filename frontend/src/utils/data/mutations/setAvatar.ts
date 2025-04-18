import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Corrected mutation structure for PostGraphile
const UPDATE_AVATAR = gql`
  mutation UpdateVoyagerAvatar($uid: UUID!, $avatar: JSON!) {
    updateVoyagerByUid(input: {
      uid: $uid,
      voyagerPatch: { avatar: $avatar }
    }) {
      voyager {
        uid
      }
    }
  }
`;

export async function setAvatar(uid: string, avatar: Record<string, any>) {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_AVATAR,
      variables: {
        uid,
        avatar: JSON.stringify(avatar),
      },
    });

    return !!data?.updateVoyagerByUid?.voyager;
  } catch (error) {
    handleError(error);
    return false;
  }
}
