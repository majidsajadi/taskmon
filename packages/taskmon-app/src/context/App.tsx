import React, { createContext } from "react";
import { useQueue, QueueState } from "../hooks/useQueue";

type AppContextState = QueueState;

export const AppContext = createContext<Partial<AppContextState>>({});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { queues, fetchQueues, queueLoading } = useQueue();

  return (
    <AppContext.Provider
      value={{
        queues,
        fetchQueues,
        queueLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
