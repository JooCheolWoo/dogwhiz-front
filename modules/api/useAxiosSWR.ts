import Axios from './Axios';
import useSWR from 'swr';

const fetcher = async (url: string, axiosOptions: any) => {
  const response = await Axios({ url, ...axiosOptions });

  if (response.data.status === 0) {
    const successRes = {
      success: true,
      data: response.data.data,
    };
    return successRes;
  } else {
    const failRes = {
      success: false,
      status: response.data.status,
      data: response.data.data,
      message: response.data.message,
    };
    return failRes;
  }
};

export const useAxiosSWR = (url: string, axiosOptions: any, swrOptions: any) => {
    const { data, error } = useSWR(url, () => fetcher(url, axiosOptions), swrOptions);
    
    return {
        res: data,
        isLoading: !error && !data,
        isError: error 
    }
}