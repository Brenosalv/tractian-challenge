import React,
{
  createContext,
  ReactNode,
  useState
} from "react";

interface GeneralContextData {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GeneralContextProviderProps {
  children: ReactNode
}

export const GeneralContext = createContext({} as GeneralContextData)

export const GeneralContextProvider = React.memo((props: GeneralContextProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        loading,
        setLoading
      }}>
      {props.children}
    </GeneralContext.Provider>
  )
})