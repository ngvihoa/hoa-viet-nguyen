import Loading from "asset/loading.svg";
import LoadingColor from "asset/loading-color.svg";

const LoadingIcon = () => {
  return <img src={Loading} alt="loading..." width={24} />;
};

const LoadingIconColor = () => {
  return <img src={LoadingColor} alt="loading..." width={24} />;
};

export { LoadingIcon, LoadingIconColor };
