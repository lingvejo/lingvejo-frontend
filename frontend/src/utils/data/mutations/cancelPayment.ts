// utils/data/mutations/cancelPayment.ts
import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const CANCEL_PAYMENT = gql`
  mutation CancelPayment($paymentId: String!) {
    update_payment_by_pk(
      pk_columns: { id: $paymentId }
      _set: { cancelled: true }
    ) {
      id
    }
  }
`;

export async function cancelPayment(paymentId: string) {
  try {
    await client.mutate({
      mutation: CANCEL_PAYMENT,
      variables: { paymentId },
    });
  } catch (error) {
    handleError(error);
  }
}
