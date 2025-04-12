"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getVoyager } from "@/utils/data/queries/getVoyager"; // Replace with your updated query

type Avatar = Record<string, any>;

export interface Voyager {
  uid: string;
  username: string;
  persona: string;
  currentPlanet: number;
  totalXP: number;
  completedTutorial: boolean;
  avatar: Avatar | null;
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
    // Eventually: replace with dynamic uid from Pi login
    getVoyager('108fa2f3-7bda-42c1-8d4c-7c64d6077305').then((data) => {
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
