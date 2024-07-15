import { useEffect, useState } from "react";
import Input from "components/Input";
import { TokenPrice } from "interfaces/tokenPrices";
import { getTokenList } from "services/token.service";
import { toast } from "react-toastify";
import { LoadingIcon, LoadingIconColor } from "components/LoadingIcon";
import { useSwapHistory } from "contexts/SwapHistory";
import { SwapProps } from "interfaces/swapHistory";
import { tokenIcons } from "data/token-icons";
import ExchangeIcon from "asset/exchange-icon.svg";

const SwapForm = () => {
  const { addStack } = useSwapHistory();

  const [tokens, setTokens] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSwap, setLoadingSwap] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorType(false);
    setLoadingSwap(true);
    setButtonDisable(true);

    setTimeout(() => {
      if (isNaN(Number(sendAmount))) {
        setLoadingSwap(false);
        setButtonDisable(false);
        setErrorType(true);
        return;
      }
      const newReceiveAmount: number =
        Number(sendAmount) *
        (tokens[receiveToken].price / tokens[sendToken].price);
      setLoadingSwap(false);
      setButtonDisable(false);
      setReceiveAmount(newReceiveAmount.toFixed(2));
      const newSwap: SwapProps = {
        send: {
          icon: tokenIcons[tokens[sendToken].currency],
          amount: Number(sendAmount),
          data: tokens[sendToken],
        },
        receive: {
          icon: tokenIcons[tokens[receiveToken].currency],
          amount: Number(newReceiveAmount.toFixed(2)),
          data: tokens[receiveToken],
        },
      };
      addStack(newSwap);
    }, 1500);
  };

  const handleChangePosition = () => {
    const tmpToken = sendToken;
    setSendToken(receiveToken);
    setReceiveToken(tmpToken);
    const tmpAmount = sendAmount;
    setSendAmount(receiveAmount);
    setReceiveAmount(tmpAmount);
  };

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        let res = await getTokenList();
        setTokens(res.sort());
        setLoading(false);
      } catch (error) {
        toast.error("Cannot get token list!");
      }
    };
    fetchTokens();
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full p-5 flex justify-center items-center">
          <LoadingIconColor />
        </div>
      )}
      {tokens.length > 0 && !loading && (
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col items-center gap-2 sm:flex-row">
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
            <img
              src={ExchangeIcon}
              alt="exchange-icon"
              width={20}
              className="sm:mt-5 cursor-pointer"
              onClick={handleChangePosition}
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
          hover:bg-violet-600 transition-all duration-300 ease-out flex gap-2 justify-center items-center"
            disabled={buttonDisable}
          >
            CONFIRM SWAP
            {loadingSwap && <LoadingIcon />}
          </button>
        </form>
      )}
      {tokens.length === 0 && !loading && (
        <div className="w-full p-5 flex justify-center items-center">
          No data found.
        </div>
      )}
    </>
  );
};

export default SwapForm;
