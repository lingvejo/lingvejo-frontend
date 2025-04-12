import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// Updated mutation using uuid for uid
const UPDATE_AVATAR = gql`
  mutation UpdateVoyagerAvatar($uid: uuid!, $avatar: jsonb!) {
    update_voyager_by_pk(
      pk_columns: { uid: $uid }
      _set: { avatar: $avatar }
    ) {
      uid
    }
  }
`;

export async function setAvatar(uid: string, avatar: Record<string, any>) {
  try {
    await client.mutate({
      mutation: UPDATE_AVATAR,
      variables: {
        uid, // Now it uses a string that should be a valid UUID
        avatar,
      },
    });
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
}