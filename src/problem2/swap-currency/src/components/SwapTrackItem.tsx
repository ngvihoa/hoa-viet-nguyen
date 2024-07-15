import { SwapProps } from "interfaces/swapHistory";
import ExchangeIcon from "asset/exchange-icon.svg";

interface SwapTrackItemProps {
  data: SwapProps;
}

const SwapTrackItem = ({ data }: SwapTrackItemProps) => {
  const { send, receive } = data;
  return (
    <div className="min-w-[430px]">
      <div
        className="w-full flex gap-6 items-center border border-neutral-300 rounded-lg
      p-2"
      >
        <div className="w-full">
          <div className="flex gap-2 item-center">
            <img
              src={send.icon}
              alt="icon"
              width={20}
              className="inline-block"
            />
            <span>{send.data.currency}</span>
          </div>
          <div className="text-sm pl-7">
            <div>Amount: {send.amount.toFixed(2)}</div>
            <div>Price: {send.data.price.toFixed(10)}</div>
          </div>
        </div>
        <div>
          <img src={ExchangeIcon} alt="exchange-icon" width={48} />
        </div>
        <div className="w-full">
          <div className="flex gap-2 item-center">
            <img
              src={receive.icon}
              alt="icon"
              width={20}
              className="inline-block"
            />
            <span>{receive.data.currency}</span>
          </div>
          <div className="text-sm pl-7">
            <div>Amount: {receive.amount.toFixed(2)}</div>
            <div>Price: {receive.data.price.toFixed(10)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapTrackItem;
