import { decryptData } from '@/modules/util/cryptoUtils.js';

const getAuthorization = () => {
    let token = '';
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem('token') === null ? '' : decryptData(window.localStorage.getItem('token')).accessToken;
    }
    return `Bearer ${token}`;
  };
  

const ConfigApi = {
  BOARD: {
    //목록 조회
    LIST: {
      url: '/boards',
      method: 'patch',
      data: '',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  },
};

export { ConfigApi, getAuthorization };