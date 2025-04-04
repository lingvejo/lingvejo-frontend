import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const UPDATE_AVATAR = gql`
  mutation UpdateVoyagerAvatar($voyagerId: Int!, $avatar: jsonb!) {
    update_voyager_by_pk(
      pk_columns: { id: $voyagerId }
      _set: { avatar: $avatar }
    ) {
      id
    }
  }
`;

export async function setAvatar(voyagerId: number, avatar: Record<string, any>) {
  try {
    await client.mutate({
      mutation: UPDATE_AVATAR,
      variables: {
        voyagerId,
        avatar,
      },
    });
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
}
