import { createContext, useState } from "react";
import GetCookie from "./cookies/getCookie";
import DecryptFromLocalStorage from './encryption/DecryptFromLocalStorage.js'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(DecryptFromLocalStorage("userId"));

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;