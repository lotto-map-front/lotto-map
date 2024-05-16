import { useEffect, useState } from 'react';
import { axiosRequestHandler } from '@/api/http';

const useFetchData = (method?: RequestMethod, url?: string, body?: any, param?: any) => {
  const [fetchedData, setFetchedData] = useState<any>([]);

  const fetchData = async (
    methodCallback?: RequestMethod,
    urlCallback?: string,
    bodyCallback?: any,
    paramCallback?: any
  ) => {
    try {
      const data = await axiosRequestHandler(methodCallback || 'get', urlCallback || '', {
        ...bodyCallback,
        param: { ...paramCallback },
      });
      setFetchedData(data);

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (method && url) {
      fetchData(method, url, body, param);
    }
  }, [method, url, body, param]);

  return { fetchedData, fetchData };
};

export default useFetchData;
