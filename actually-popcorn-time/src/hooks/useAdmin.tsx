import { useState, useEffect } from "react";

interface UseAdminReturn {
  isAdmin: boolean;
}

export const useAdmin = (userId: number): UseAdminReturn => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const is_admin = sessionStorage.getItem("is_admin");
    if (is_admin) {
      setIsAdmin(true);
    }
  }, [userId]);

  return { isAdmin };
};
