import { TokenPrice } from "interfaces/tokenPrices";

export interface TokenSwapProps {
  data: TokenPrice;
  icon: string;
  amount: number;
}

export interface SwapProps {
  send: TokenSwapProps;
  receive: TokenSwapProps;
}

export interface SwapHistoryContextProps {
  stack: SwapProps[];
  addStack: (newSwap: SwapProps) => void;
}
