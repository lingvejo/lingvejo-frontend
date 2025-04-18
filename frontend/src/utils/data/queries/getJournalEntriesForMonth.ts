import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import { handleError } from '@/utils/errorHandler';

// Define the GraphQL query to fetch journal entries for a given month
const GET_JOURNAL_ENTRIES_FOR_MONTH = gql`
  query GetJournalEntriesForMonth($uid: UUID!, $start: Date!, $end: Date!) {
    allJournalEntries(
      filter: {
        uid: { equalTo: $uid },
        entryDate: {
          greaterThanOrEqualTo: $start,
          lessThanOrEqualTo:   $end
        }
      }
      orderBy: ENTRY_DATE_ASC
    ) {
      nodes {
        id
        entryDate
        content
      }
    }
  }
`;

export async function getJournalEntriesForMonth(
  uid: string,
  start: string, // e.g. "2025-04-01"
  end: string // e.g. "2025-04-30"
): Promise<
  {
    id: number;
    entryDate: string;
    content: string;
  }[]
> {
  try {
    const { data } = await client.query({
      query: GET_JOURNAL_ENTRIES_FOR_MONTH,
      variables: { uid, start, end },
      fetchPolicy: 'network-only', // Ensures fresh data from the server
    });

    // Return the fetched journal entries or an empty array if no data is returned
    return data?.allJournalEntries?.nodes ?? [];
  } catch (error) {
    handleError(error); // Ensure error handling
    return [];
  }
}
