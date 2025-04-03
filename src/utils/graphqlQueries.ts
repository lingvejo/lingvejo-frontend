import { gql } from "@apollo/client";

// GraphQL queries to fetch data
export const GET_GALAXIES = gql`
  query GetGalaxies {
    galaxy {
      id
      name
    }
  }
`;

export const GET_SOLAR_SYSTEMS = gql`
  query GetSolarSystems {
    solarSystem {
      id
      name
      iso
    }
  }
`;

export const GET_PLANETS = gql`
  query GetPlanets {
    planet {
      id
      name
      iso
      discoveredDate
      discoveredBy
      lastObservedDate
      lastObservedBy
      adventurers
      wizards
      solarSystemId
      description
    }
  }
`;


export const GET_UNITS = gql`
  query GetUnits {
    unit {
      id
      title
      description
      sectionId
    }
  }
`;

export const GET_LESSONS = gql`
  query GetLessons {
    lesson {
      id
      title
      unitId
    }
  }
`;

export const GET_MODULES = gql`
  query GetModules {
    module {
      id
      lessonId
      type
      title
      content
    }
  }
`;