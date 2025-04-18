// utils/data/setters/setJournalEntry.ts

import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const UPSERT_JOURNAL_ENTRY = gql`
  mutation UpsertJournalEntry($uid: uuid!, $date: date!, $content: String!) {
    insert_journalEntry_one(
      object: { uid: $uid, entryDate: $date, content: $content }
      on_conflict: {
        constraint: journalEntry_pkey,
        update_columns: [content]
      }
    ) {
      id
    }
  }
`;

export async function setJournalEntry(
  uid: string,
  date: string, // <-- it's a string in format 'YYYY-MM-DD'
  content: string
) {
  try {
    await client.mutate({
      mutation: UPSERT_JOURNAL_ENTRY,
      variables: {
        uid,
        date, // already in 'YYYY-MM-DD' format
        content,
      },
    });
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
}
