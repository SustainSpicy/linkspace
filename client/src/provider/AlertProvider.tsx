import { createContext } from "vm";

const AlertContext = createContext({});

const AlertProvider = () => {
  return <AlertContext.Provider value={{}}></AlertContext.Provider>;
};
