// utils/data/mutations/markTutorialComplete.ts
import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const MARK_TUTORIAL_COMPLETE = gql`
  mutation MarkTutorialComplete($voyagerId: Int!) {
    update_voyager_by_pk(
      pk_columns: { id: $voyagerId }
      _set: { completedTutorial: true }
    ) {
      id
    }
  }
`;

export async function markTutorialComplete(voyagerId: number) {
  try {
    await client.mutate({
      mutation: MARK_TUTORIAL_COMPLETE,
      variables: {
        voyagerId,
      },
    });
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
}
