interface PharmacyDataItem {
  [key: string]: string | number | undefined;
  dutyAddr: string;
  dutyMapimg?: string;
  dutyName: string;
  dutyTel1: string;
  dutyTime1s?: string;
  dutyTime1c?: number;
  dutyTime2s?: string;
  dutyTime2c?: number;
  dutyTime3s?: string;
  dutyTime3c?: number;
  dutyTime4s?: string;
  dutyTime4c?: number;
  dutyTime5s?: string;
  dutyTime5c?: number;
  dutyTime6s?: string;
  dutyTime6c?: number;
  dutyTime7s?: string;
  dutyTime7c?: number;
  dutyEtc?: string;
  dutyInf?: string;
  hpid: string;
  postCdn1: string;
  postCdn2: string;
  rnum: number;
  wgs84Lat: number;
  wgs84Lon: number;
}

interface PharmacyData {
  items: {
    item: PharmacyDataItem[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export { PharmacyData, PharmacyDataItem };
