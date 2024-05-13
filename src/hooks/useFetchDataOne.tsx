import { useEffect, useState } from 'react';
import LottoStoreItem from '@/models/LottoStoreItem';
import { axiosRequestHandler } from '@/api/http';

const useFetchDataAll = (method: RequestMethod, url: string, body: any, param: any) => {
  const [data, setData] = useState<LottoStoreItem>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axiosRequestHandler(method, url, { ...body, param: { ...param } });
    return response;
  };
  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};

export default useFetchDataAll;
