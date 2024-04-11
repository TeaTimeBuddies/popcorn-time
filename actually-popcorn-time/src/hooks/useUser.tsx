import { useState, useEffect } from "react";
interface UseUserReturn {
  isUser: boolean;
}

export const useUser = (userId: number): UseUserReturn => {
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsUser(true);
    }
  }, [userId]);

  return { isUser };
};
