import { ReactNode, createContext, useContext, useEffect } from "react";
import useAlert from "../hooks/useAlert";
import { alertProps } from "../constant/types";

interface AlertContextType {
  alert: any;
  showAlert: ({ text, type }: alertProps) => void;
  hideAlert: () => void;
}
interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const dataToSend: AlertContextType = { alert, showAlert, hideAlert };

  return (
    <AlertContext.Provider value={dataToSend}>{children}</AlertContext.Provider>
  );
};
export default AlertProvider;

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};
