import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { decryptData } from '@/modules/cryptoUtils';
import LoginDto from '@/model/Member';


type IsLoginContextType = {
  loginInfo: null | LoginDto;
  setLoginInfo: (Member : LoginDto | null) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

type IsLoginProviderProps = {
  children: ReactNode;
};

const IsLoginContext = createContext<IsLoginContextType | undefined>(undefined);

export const IsLoginProvider: React.FC<IsLoginProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginDto | null>(null);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem('loginInfo');
    if (storedLoginInfo) {
      const decryptedLoginInfo = decryptData(storedLoginInfo);
      setLoginInfo(decryptedLoginInfo);
      setIsLogin(true);
    }
  }, []);

  const value = useMemo(() => ({ loginInfo, setLoginInfo,isLogin, setIsLogin }), [loginInfo, isLogin]);
  return <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>;
};

export const useLoginContext = () => {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within an AuthProvider');
  }
  return context;
}