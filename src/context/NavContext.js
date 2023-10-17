import { createContext } from "react";

export const NavContext = createContext();

export default function NavContextProvider({children}) {
    return (
        <NavContext.Provider value={{}}>
            {children}
        </NavContext.Provider>
    )
}