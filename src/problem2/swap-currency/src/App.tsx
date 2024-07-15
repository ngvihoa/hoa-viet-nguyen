import SwapForm from "./components/SwapForm";

function App() {
  return (
    <div
      className="w-full h-dvh bg-violet-700 flex justify-center items-center flex-col
    gap-8"
    >
      <div className="text-white">
        <h1 className="font-bold text-2xl sm:text-4xl">
          Welcome to SwapQrenC!
        </h1>
        <p className="mt-2 italic text-center">
          Checkout your tokens and explore their exchange rates.
        </p>
      </div>
      <div className="bg-white rounded-xl w-5/6 h-4/5 p-5 pt-6 md:w-2/3">
        <SwapForm />
        <hr />
      </div>
    </div>
  );
}

export default App;
