// utils/data/mutations/signinVoyager.ts
import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const SIGNIN_VOYAGER = gql`
  mutation SigninVoyager($uid: String!, $username: String!) {
    insert_voyager_one(
      object: { uid: $uid, username: $username }
      on_conflict: {
        constraint: voyager_uid_key
        update_columns: [username]
      }
    ) {
      id
      uid
      username
    }
  }
`;

export async function signinVoyager(uid: string, username: string) {
  try {
    const { data } = await client.mutate({
      mutation: SIGNIN_VOYAGER,
      variables: { uid, username },
    });
    return data.insert_voyager_one;
  } catch (error) {
    handleError(error);
    return null;
  }
}
