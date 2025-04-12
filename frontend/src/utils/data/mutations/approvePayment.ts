// utils/data/mutations/approvePayment.ts
import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const APPROVE_PAYMENT = gql`
  mutation ApprovePayment($paymentId: String!) {
    update_payment_by_pk(pk_columns: { id: $paymentId }, _set: { developerApproved: true }) {
      id
    }
  }
`;

export async function approvePayment(paymentId: string) {
  try {
    await client.mutate({
      mutation: APPROVE_PAYMENT,
      variables: { paymentId },
    });
  } catch (error) {
    handleError(error);
  }
}
