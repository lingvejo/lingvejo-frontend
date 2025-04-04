import { gql } from '@apollo/client';
import client from '@/utils/apolloClient';
import { handleError } from '@/utils/errorHandler';

const GET_JOURNAL_ENTRIES_FOR_MONTH = gql`
  query GetJournalEntriesForMonth($voyagerId: Int!, $start: date!, $end: date!) {
    journalEntry(
      where: {
        voyagerId: { _eq: $voyagerId }
        entryDate: { _gte: $start, _lte: $end }
      }
      order_by: { entryDate: asc }
    ) {
      id
      entryDate
      content
    }
  }
`;

export async function getJournalEntriesForMonth(
  voyagerId: number,
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
      variables: { voyagerId, start, end },
      fetchPolicy: 'network-only',
    });

    return data?.journalEntry ?? [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
