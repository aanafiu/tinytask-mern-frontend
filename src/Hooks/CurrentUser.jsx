import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const CurrentUser = (authEmailID) =>{
    const [userCurrentData, setUserCurrentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refetchFlag, setRefetchFlag] = useState(0); // State to trigger refetch
  
    // console.log("CurrentUser Hook - authEmailID:", authEmailID);
    const fetchUserData = useCallback(async () => {
      if (!authEmailID) return;
  
      setLoading(true);
      const res = await axios.get(`https://tinytask-backend.vercel.app/currentUser?email=${authEmailID}`);
      setUserCurrentData(res.data.data || null);
    //   console.log("CurrentUser Hook - User Data:", res.data);
      setLoading(false);
    }, [authEmailID]);
  
    // Fetch user data on mount & when refetchFlag changes
    useEffect(() => {
      fetchUserData();
    }, [fetchUserData, refetchFlag]);
  
    // Function to trigger refetch
    const refetch = () => {
      setRefetchFlag((prev) => prev + 1);
    };
  
    return { userCurrentData, loading, refetch, setLoading };
  };
  
export default CurrentUser;