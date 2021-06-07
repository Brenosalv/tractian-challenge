import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import axios from "axios";

import { GeneralContext } from "./GeneralContext";

export interface UsersData {
  id: number;
  email: string;
  name: string;
  unitId: number;
}

interface UsersContextData {
  allUsers: UsersData[];
}

interface UsersContextProviderProps {
  children: ReactNode
}

export const UsersContext = createContext({} as UsersContextData)

export const UsersContextProvider = (props: UsersContextProviderProps) => {
  const { setLoading } = useContext(GeneralContext);

  const [allUsers, setAllUsers] = useState<UsersData[]>([])

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/tractian/fake-api/users")
      .then(response => {
        setAllUsers(response.data);
        setLoading(true);
      }, error => {
        console.error(error);
      });
  }, []);

  return (
    <UsersContext.Provider
      value={{
        allUsers
      }}>
      {props.children}
    </UsersContext.Provider>
  )
}