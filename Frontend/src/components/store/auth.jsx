import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken]=useState(localStorage.getItem("Token"));
    const [user,setUser] = useState("")
    const storeToken = (serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("Token",serverToken);
    };
    
    let isLoggedIn = !!token 

    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("Token");
    };    

    const userAuthentication= async ()=>{
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              };
             const response = await axios.get("http://localhost:5000/auth/user",config);
             setUser(response.data.userData);
            
        } catch (error) {
            console.log("Error fetching login data")
            
        }

    }
    useEffect(()=>{
        userAuthentication();
    },[])

    return(
        <AuthContext.Provider value={{isLoggedIn,storeToken , LogoutUser,user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    return useContext(AuthContext);
}