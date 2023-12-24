import { useState, useCallback } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';

const genRandomNum = () => Math.floor(Math.random() * 1000);

export const useAvatar = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAvatar = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const AVATAR_API = `https://api.multiavatar.com/${genRandomNum()}?apikey=${process.env.REACT_APP_AVATAR_KEY}`;
      const response = await axios.request({
        method: 'GET',
        url: AVATAR_API
      });
      if (response?.data) {
        const result = Buffer.from(response.data);
        return result.toString('base64');
      }
    } catch (e) {
      setError(e?.response?.data || e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, isLoading, fetchAvatar };
};
