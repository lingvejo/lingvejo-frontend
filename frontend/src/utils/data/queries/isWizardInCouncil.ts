import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const IS_WIZARD_IN_COUNCIL = gql`
  query IsWizardInCouncil($uid: uuid!) {
    wizardCouncil(where: { uid: { _eq: $uid } }) {
      appointedAt
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
