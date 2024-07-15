import SwapForm from "components/SwapForm";
import SwapTrack from "components/SwapTrack";

function App() {
  return (
    <div className="w-full min-h-dvh py-10 bg-violet-700 flex items-center flex-col gap-8">
      <div className="text-white text-center">
        <h1 className="font-bold text-2xl sm:text-4xl">
          Welcome to SwapQrenC!
        </h1>
        <p className="mt-2 italic">
          Checkout your tokens and explore their exchange rates.
        </p>
      </div>
      <div className="bg-white rounded-xl w-5/6 min-h-4/5 p-5 pt-6 md:w-2/3">
        <SwapForm />
        <hr className="my-6" />
        <SwapTrack />
      </div>
    </div>
  );
}

export default App;
