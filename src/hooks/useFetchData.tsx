import { useEffect, useState } from 'react';
import { axiosRequestHandler } from '@/api/http';

const useFetchData = (method: RequestMethod, url: string, body: any, param: any) => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await axiosRequestHandler(`${method}`, `${url}`, { ...body, param: { ...param } });
    setFetchedData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return fetchedData;
};

export default useFetchData;
