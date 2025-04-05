import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const IS_WIZARD_IN_COUNCIL = gql`
  query IsWizardInCouncil($voyagerId: Int!) {
    wizardCouncil(where: { voyagerId: { _eq: $voyagerId } }) {
      voyagerId
    }
  }
`;

export async function isWizardInCouncil(voyagerId: number): Promise<boolean> {
  try {
    const { data } = await client.query({
      query: IS_WIZARD_IN_COUNCIL,
      variables: { voyagerId },
      fetchPolicy: "no-cache",
    });

    return data.wizardCouncil.length > 0;
  } catch (error) {
    handleError(error);
    return false;
  }
}
