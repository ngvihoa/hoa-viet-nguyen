import { useSwapHistory } from "contexts/SwapHistory";
import SwapTrackItem from "components/SwapTrackItem";

const SwapTrack = () => {
  const { stack } = useSwapHistory();
  return (
    <div className="h-full pr-2 pb-2 overflow-auto">
      <div className="flex flex-col gap-6">
        {stack.length > 0 &&
          stack.map(
            (item, index) =>
              index < 10 && (
                <SwapTrackItem key={`swap-track-item-${index}`} data={item} />
              )
          )}
      </div>
    </div>
  );
};

export default SwapTrack;
