import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (responseObj) => {

        console.log( "email : " + responseObj.data.email);
        setCurrentUser({
            id : responseObj.data._id,
            username : responseObj.data.username,
            name : responseObj.data.name,
            email : responseObj.data.email,
            profilePic: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
        });



    
    };

    console.log(currentUser);
    console.log(JSON.stringify(currentUser));

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};