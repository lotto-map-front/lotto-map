import { useEffect, useState } from 'react';
import { axiosRequestHandler } from '@/api/http';
import LottoStoreItem from '@/models/LottoStoreItem';

const useFetchDataAll = (method: RequestMethod, url: string, body: any, param: any) => {
  const [data, setData] = useState<LottoStoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    const response = await axiosRequestHandler(method, url, { ...body, param: { ...param } });
    return response;
  };
  useEffect(() => {
    fetchData().then((res) => {
      setData(res.lottoStores);
      setLoading(false);
      setTotalCount(res.totalCount);
    });
  }, [body]);

  return { data, loading, totalCount };
};

export default useFetchDataAll;
