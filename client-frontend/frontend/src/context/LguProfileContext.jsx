import { createContext, useState, useEffect } from 'react';
import { lguProfileData as initialProfileData } from '../API/lgu/lguProfileData';

export const LguProfileContext = createContext();

export const LguProfileProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const [profileData, setProfileData] = useState({
    ...initialProfileData,
    username: storedUser.username || initialProfileData.username,
    role: storedUser.role || initialProfileData.role,
    contactNo: storedUser.contactNumber || initialProfileData.contactNo,
  });

  useEffect(() => {
    const handleLogin = () => {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      setProfileData(prev => ({
        ...prev,
        username: storedUser.username || prev.username,
        role: storedUser.role || prev.role,
        contactNo: storedUser.contactNumber || prev.contactNo,
      }));
    };

    window.addEventListener('userLogin', handleLogin);
    return () => window.removeEventListener('userLogin', handleLogin);
  }, []);

  const updateProfile = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
    // TODO: API call to save profile to backend
  };

  return (
    <LguProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </LguProfileContext.Provider>
  );
};