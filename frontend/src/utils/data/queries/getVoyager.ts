import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";
import { Voyager } from "@/contexts/VoyagerContext";

const GET_VOYAGER = gql`
  query GetVoyager($id: Int!) {
    voyager(where: { id: { _eq: $id } }) {
      id
      username
      email
      firstName
      lastName
      bio
      createdAt
      updatedAt
      lastLogin
      location
      totalXP
      completedTutorial
      avatar
      guildVoyagers(where: { voyagerId: { _eq: $id } }) {
        role
        guild {
          name
          emblem
        }
      }
    }
  }
`;

export async function getVoyager(id: number): Promise<Voyager | null> {
  try {
    const { data } = await client.query({
      query: GET_VOYAGER,
      variables: { id },
    });

    return data?.voyager?.[0] ?? null;
  } catch (error) {
    handleError(error);
    return null;
  }
}
