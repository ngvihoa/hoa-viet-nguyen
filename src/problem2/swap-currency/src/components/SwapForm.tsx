import React, { useState } from "react";
import Input from "./Input";
import { TokenPrice } from "../interfaces/tokenPrices";
import { prices } from "../data/prices";

const SwapForm = () => {
  const [tokens, setTokens] = useState<TokenPrice[]>(prices.sort());

  const [sendToken, setSendToken] = useState<number>(0);
  const [receiveToken, setReceiveToken] = useState<number>(0);
  const [sendAmount, setSendAmount] = useState<string>("0");
  const [receiveAmount, setReceiveAmount] = useState<string>("0");

  const [errorType, setErrorType] = useState(false);

  const handleChangeSendToken = (newToken: number) => {
    setSendToken(newToken);
  };
  const handleChangeReceiveToken = (newToken: number) => {
    setReceiveToken(newToken);
  };
  const handleChangeSendAmount = (newAmount: string) => {
    setSendAmount(newAmount);
  };
  const handleChangeReceiveAmount = (newAmount: string) => {
    setReceiveAmount(newAmount);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrorType(false);

    if (isNaN(Number(sendAmount))) {
      setErrorType(true);
      return;
    }
    const newReceiveAmount: number =
      Number(sendAmount) *
      (tokens[receiveToken].price / tokens[sendToken].price);
    setReceiveAmount(newReceiveAmount.toFixed(10));
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-4 sm:flex-row">
        <Input
          label="Amount to send"
          selectName="send-currency"
          inputName="input-amount"
          tokenList={tokens}
          selectedToken={sendToken}
          onChangeToken={handleChangeSendToken}
          amount={sendAmount}
          onChangeAmount={handleChangeSendAmount}
        />
        <Input
          label="Amount to receive"
          selectName="receive-currency"
          inputName="output-amount"
          tokenList={tokens}
          selectedToken={receiveToken}
          onChangeToken={handleChangeReceiveToken}
          readonly={true}
          amount={receiveAmount}
          onChangeAmount={handleChangeReceiveAmount}
        />
      </div>
      {errorType && (
        <p className="text-red-600 mt-4">
          <i>Amount to send</i> input must be a number
        </p>
      )}
      <button
        className="mt-4 w-full px-4 py-2 bg-violet-500 rounded-lg text-white font-semibold
      hover:bg-violet-600 transition-all duration-300 ease-out"
      >
        CONFIRM SWAP
      </button>
    </form>
  );
};

export default SwapForm;
