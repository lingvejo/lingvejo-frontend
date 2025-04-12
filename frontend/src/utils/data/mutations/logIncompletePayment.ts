// utils/data/mutations/logIncompletePayment.ts
import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const LOG_INCOMPLETE_PAYMENT = gql`
  mutation LogIncompletePayment($payment: payment_insert_input!) {
    insert_payment_one(object: $payment) {
      id
    }
  }
`;

export async function logIncompletePayment(payment: any) {
  try {
    await client.mutate({
      mutation: LOG_INCOMPLETE_PAYMENT,
      variables: { payment },
    });
  } catch (error) {
    handleError(error);
  }
}
