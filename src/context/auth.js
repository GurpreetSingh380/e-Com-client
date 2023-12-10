import {useState, useContext, createContext} from 'react'
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    });
    axios.defaults.headers.common["Authorization"] = auth?.token;
    return (<AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>);
}

// Custom hook
const useAuth = () => {return useContext(AuthContext)};

export {useAuth, AuthProvider};