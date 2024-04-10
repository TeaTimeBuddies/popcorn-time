import {useState, useEffect, useCallback} from "react";
import {API_URL} from "../constants";

interface UseUserReturn {
    isUser: boolean;
}

export const useUser = (userId: number): UseUserReturn => {
    const [isUser, setIsUser] = useState<boolean>(false);
    const token = sessionStorage.getItem("token")
    
    const checkUserStatus = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_URL}validate/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            console.log("token in useUser", token);
            const data = await response.json();
            setIsUser(data.isUser);
            console.log("status for user", data.isUser)
        } catch (error) {
            console.error("Error checking user status:", error);
        }
    }
    , [userId, token]);

    useEffect(() => {
        checkUserStatus();
    }, [checkUserStatus]);

    return {isUser};
};