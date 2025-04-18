import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const IS_WIZARD_IN_COUNCIL = gql`
  query IsWizardInCouncil($uid: UUID!) {
    allWizardCouncils(condition: {uid: $uid}) {
      nodes {
        appointedAt
      }
    }
  }
`;

export async function isWizardInCouncil(uid: string): Promise<boolean> {
  try {
    const { data } = await client.query({
      query: IS_WIZARD_IN_COUNCIL,
      variables: { uid },
      fetchPolicy: "no-cache",
    });

    return data.wizardCouncil.length > 0;
  } catch (error) {
    handleError(error);
    return false;
  }
}
