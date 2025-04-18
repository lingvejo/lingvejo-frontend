import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";  // Use your Apollo Client setup
import { handleError } from "@/utils/errorHandler";

// GraphQL mutation to mark tutorial completion for PostGraphile
const MARK_TUTORIAL_COMPLETE = gql`
  mutation MarkTutorialComplete($uid: UUID!) {
    updateVoyagerByUid(input: {voyagerPatch: {completedTutorial: true}, uid: $uid}) {
      voyager {
        completedTutorial
      }
    }
  }
`;

export async function markTutorialComplete(uid: string): Promise<boolean> {
  try {
    const { data } = await client.mutate({
      mutation: MARK_TUTORIAL_COMPLETE,
      variables: { uid },
    });

    // Check if the update was successful and return true if so
    return data?.updateVoyagerByUid?.voyager?.completedTutorial || false;
  } catch (error) {
    handleError(error);  // Handle the error (logging, reporting, etc.)
    return false;  // Return false if there's an error
  }
}
