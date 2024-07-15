import { useState } from "react";
import Arrow from "asset/arrow.svg";
import { TokenPrice } from "interfaces/tokenPrices";
import { tokenIcons } from "data/token-icons";

interface InputProps {
  label: string;
  selectName: string;
  inputName: string;
  tokenList: TokenPrice[];
  selectedToken: number;
  onChangeToken: (newToken: number) => void;
  readonly?: boolean;
  amount: string;
  onChangeAmount: (newAmount: string) => void;
}

const Input = ({
  label,
  selectName,
  inputName,
  tokenList,
  selectedToken,
  onChangeToken,
  readonly = false,
  amount,
  onChangeAmount,
}: InputProps) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const toggleOpenOptions = () => {
    setOpenOptions((prev) => !prev);
  };

  const handleOnChangeOptions = (index: number) => {
    onChangeToken(index);
    setOpenOptions(false);
  };

  return (
    <div className="w-full flex flex-col gap-1 flex-1">
      <label htmlFor={inputName} className="font-semibold">
        {label}
      </label>
      <div className="w-full flex flex-col relative">
        <div
          id={selectName}
          className="relative focus-visible:outline-none text-sm p-2 rounded-t-lg
          bg-violet-700 text-white h-9 flex justify-between items-center cursor-pointer"
          onClick={toggleOpenOptions}
        >
          <div className="flex gap-2 items-center">
            <img
              src={tokenIcons[tokenList[selectedToken].currency]}
              alt="icons"
              width={20}
              className="border-white border-2 rounded-full bg-white"
            />
            {tokenList[selectedToken].currency}
          </div>
          <img
            src={Arrow}
            alt="arrow"
            width={24}
            style={{ color: "white" }}
            className={`transition-all duration-300 ease-out ${
              openOptions ? "rotate-180" : ""
            }`}
          />
        </div>
        {openOptions && (
          <div
            className="absolute left-0 top-10 min-h-10 max-h-96 bg-white overflow-y-auto
            text-neutral-900 w-full border border-neutral-300 rounded-lg shadow-md cursor-pointer"
          >
            {tokenList.map((item, index) => (
              <option
                key={index}
                value={index}
                className={`p-1 px-2 text-sm hover:bg-violet-200 ${
                  index === selectedToken ? "bg-violet-200" : ""
                }`}
                onClick={() => handleOnChangeOptions(index)}
              >
                {item.currency}
              </option>
            ))}
          </div>
        )}
        <input
          id={inputName}
          name={inputName}
          type="text"
          className="w-full focus-visible:outline-none p-2 border border-neutral-400 rounded-b-lg"
          readOnly={readonly}
          value={amount}
          onChange={(e) => onChangeAmount(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
