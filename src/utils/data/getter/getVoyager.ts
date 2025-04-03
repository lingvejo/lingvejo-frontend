import { gql } from "@apollo/client";
import client from "@/utils/apolloClient";
import { handleError } from "@/utils/errorHandler";

const GET_VOYAGER = gql`
  query GetVoyager($id: Int!) {
    voyager(where: { id: { _eq: $id } }) {
      id
      username
      email
      firstName
      lastName
      profilePicture
      bio
      createdAt
      updatedAt
      lastLogin
      language
      totalXP
      completedTutorial
      isActive
      guildVoyagers(where: { voyagerId: { _eq: $id } }) {
        guild {
          name  # Only the name, not the whole guild data
        }
        role
      }
    }
  }
`;

interface Guild {
  id: number;
  name: string;
  emblem: string | null;
  role: string;
}

interface Voyager {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
  language: string;
  totalXP: number;
  completedTutorial: boolean;
  isActive: boolean;
  guildVoyagers: Guild[];
}

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
