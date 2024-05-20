import { useEffect, useState } from 'react';
import { axiosRequestHandler } from '@/api/http';
import { LottoStore } from '@/models/LottoStore';

const useFetchDataAll = (method: RequestMethod, url: string, body: any, param: any) => {
  const [data, setData] = useState<LottoStore>();
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
