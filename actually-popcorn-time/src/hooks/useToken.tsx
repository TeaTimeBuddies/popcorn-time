import { useState, useEffect } from "react";

interface UseFetchWithTokenReturn {
  data: any;
  error: any;
  isLoading: boolean;
}

const useFetchWithToken = (
  url: string,
  options?: RequestInit
): UseFetchWithTokenReturn => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(url, {
          ...options,
          headers: {
            ...options?.headers,
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        // setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetchWithToken;
