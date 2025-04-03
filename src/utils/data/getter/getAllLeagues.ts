import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// GraphQL query to get all leagues
const GET_ALL_LEAGUES = gql`
  query GetAllLeagues {
    league {
      id
      name
      minXP
      maxXP
    }
  }
`;

// Define the League interface
interface League {
  id: number;
  name: string;
  minXP: number;
  maxXP: number | null;
}

// Function to get all leagues
export async function getAllLeagues(): Promise<League[] | null> {
  try {
    const { data } = await client.query({
      query: GET_ALL_LEAGUES,
    });

    return data?.league ?? null; // Return the list of leagues
  } catch (error) {
    handleError(error);
    return null; // Return null if there is an error
  }
}
