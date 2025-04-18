import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

// PostGraphile-style query using allGuilds + nodes
const GET_ALL_GUILDS = gql`
  query GetAllGuilds {
    allGuilds {
      nodes {
        id
        name
        description
        emblem
        maxMembers
        createdAt
        updatedAt
      }
    }
  }
`;

interface Guild {
  id: number;
  name: string;
  description: string | null;
  emblem: string | null;
  maxMembers: number;
  createdAt: string;
  updatedAt: string;
}

export async function getAllGuilds(): Promise<Guild[] | []> {
  try {
    const { data } = await client.query({
      query: GET_ALL_GUILDS,
      fetchPolicy: "no-cache",
    });

    return data?.allGuilds?.nodes ?? [];
  } catch (error) {
    handleError(error);
    return [];
  }
}
