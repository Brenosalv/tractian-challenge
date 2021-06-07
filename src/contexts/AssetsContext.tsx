import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import axios from "axios";

import { GeneralContext } from "./GeneralContext";

export interface AssetsData {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: 70;
  name: string;
  image: string;
  specifications: {
    maxTemp: number;
    rpm: number;
    power: number
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string
  };
  unitId: number;
  companyId: number;
}

interface AssetsContextData {
  allAssets: AssetsData[];
}

interface AssetsContextProviderProps {
  children: ReactNode
}

export const AssetsContext = createContext({} as AssetsContextData)

export const AssetsContextProvider = (props: AssetsContextProviderProps) => {
  const { setLoading } = useContext(GeneralContext);

  const [allAssets, setAllAssets] = useState<AssetsData[]>([]);

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/tractian/fake-api/assets")
      .then(response => {
        setAllAssets(response.data);
        setLoading(true);
      }, error => {
        console.error(error);
      });
  }, []);

  return (
    <AssetsContext.Provider
      value={{
        allAssets
      }}>
      {props.children}
    </AssetsContext.Provider>
  )
}