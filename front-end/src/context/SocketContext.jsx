import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";


export const SocketContext = createContext();

export function useSocketContext() {
    return useContext(SocketContext);
}

export function SocketContextProvider({children}){

    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect( () => {
        if (authUser){
            const socket = io("https://chat-app-xflo.onrender.com",
				{
					query: {
						userId: authUser._id,
					},
				}
			);
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {socket.close();};
        }else{
           if (socket) {
             socket.close();
             setSocket(null);
           }
            
        }
    }, [authUser] )

    return(
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}