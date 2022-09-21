import { createContext, useContext, useMemo, useReducer } from "react";
import { root_reducer } from "./reducers/root_reducer";

const default_state = {blogs: [], user: {}}

const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(root_reducer, default_state)
    const store = useMemo(() => [state, dispatch], [state])
    return (
        <StoreContext.Provider value={store}>{ children }</StoreContext.Provider>
        )

}

export const useStore = () => useContext(StoreContext)