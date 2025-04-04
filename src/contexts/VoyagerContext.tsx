"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getVoyager } from '@/utils/data/queries/getVoyager'; // Your actual user-fetching function

type Avatar = Record<string, any>;

interface Guild {
  name: string;
  emblem: string | null;
  role: string;
}

export interface Voyager {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
  language: string;
  totalXP: number;
  completedTutorial: boolean;
  isActive: boolean;
  avatar: Avatar | null;
  guildVoyagers: Guild[];
}

const VoyagerContext = createContext<{
  voyager: Voyager | null;
  setVoyager?: (v: Voyager) => void;
  loading: boolean;
}>({ voyager: null, loading: true });

export const VoyagerProvider = ({ children }: { children: ReactNode }) => {
  const [voyager, setVoyager] = useState<Voyager | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // debug: id === 2
    getVoyager(2).then((data) => {
      setVoyager(data);
      setLoading(false);
    });
  }, []);

  return (
    <VoyagerContext.Provider value={{ voyager, setVoyager, loading }}>
      {children}
    </VoyagerContext.Provider>
  );
};

export const useVoyager = () => useContext(VoyagerContext);
