import { SwapHistoryContextProps, SwapProps } from "interfaces/swapHistory";
import React, { createContext, useContext, useState } from "react";

const SwapHistoryContext = createContext<SwapHistoryContextProps>({
  stack: [],
  addStack: (newSwap: SwapProps) => {},
});

interface SwapHistoryProps {
  children: React.ReactNode;
}

const SwapHistory = ({ children }: SwapHistoryProps) => {
  const [swapStack, setSwapStack] = useState<SwapProps[]>([]);

  const addSwapStack = (newSwap: SwapProps) => {
    setSwapStack((prev) => [newSwap, ...prev]);
  };

  const context: SwapHistoryContextProps = {
    stack: swapStack,
    addStack: addSwapStack,
  };
  return (
    <SwapHistoryContext.Provider value={context}>
      {children}
    </SwapHistoryContext.Provider>
  );
};

export const useSwapHistory = () => useContext(SwapHistoryContext);
export default SwapHistory;
