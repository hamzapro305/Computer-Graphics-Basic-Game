import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

type StoreProviderType = { children: ReactNode };
const StoreProvider = ({ children }: StoreProviderType) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
