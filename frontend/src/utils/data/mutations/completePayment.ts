// utils/data/mutations/completePayment.ts
import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const COMPLETE_PAYMENT = gql`
  mutation CompletePayment($paymentId: String!, $txid: String!) {
    update_payment_by_pk(
      pk_columns: { id: $paymentId }
      _set: {
        developerCompleted: true
        transactionId: $txid
      }
    ) {
      id
    }
  }
`;

export async function completePayment(paymentId: string, txid: string) {
  try {
    await client.mutate({
      mutation: COMPLETE_PAYMENT,
      variables: { paymentId, txid },
    });
  } catch (error) {
    handleError(error);
  }
}
