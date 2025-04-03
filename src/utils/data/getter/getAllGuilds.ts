import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// GraphQL query to get all guilds
const GET_ALL_GUILDS = gql`
  query GetAllGuilds {
    guild {
      id
      name
      description
      emblem
      maxMembers
      createdAt
      updatedAt
    }
  }
`;

// Define the Guild interface
interface Guild {
  id: number;
  name: string;
  emblem: string | null;
  maxMembers: number;
  createdAt: string;
  updatedAt: string;
}

// Function to get all guilds
export async function getAllGuilds(): Promise<Guild[] | null> {
  try {
    const { data } = await client.query({
      query: GET_ALL_GUILDS,
    });

    return data?.guild ?? null; // Return the list of guilds
  } catch (error) {
    handleError(error);
    return null; // Return null if there is an error
  }
}
