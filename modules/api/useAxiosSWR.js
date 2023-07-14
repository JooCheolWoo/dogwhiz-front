import Axios from './Axios';
import useSWR from 'swr';

const fetcher = async (url, axiosOptions) => {
  const response = await Axios({ url, ...axiosOptions });

  if (response.status === 0) {
    const successRes = {
      success: true,
      data: response.data,
    };
    return successRes;
  } else {
    const failRes = {
      success: false,
      status: response.status,
      data: response.data,
      message: response.message,
    };
    return failRes;
  }
};

export const useAxiosSWR = (url, axiosOptions, swrOptions) => {
    const { data, error } = useSWR(url, () => fetcher(url, axiosOptions), swrOptions);
    
    return {
        res: data,
        isLoading: !error && !data,
        isError: error 
    }
}