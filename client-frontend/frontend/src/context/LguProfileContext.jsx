import { createContext, useState, useEffect } from 'react';
import { checkSession } from '../API/authService';

export const LguProfileContext = createContext();

const initialProfileData = {
  username: 'LGU User',
  role: 'STAFF',
  contactNo: '',
  email: '',
};

export const LguProfileProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const [profileData, setProfileData] = useState({
    ...initialProfileData,
    username: storedUser.username || initialProfileData.username,
    role: storedUser.role || initialProfileData.role,
    contactNo: storedUser.contactNumber?.trim() || initialProfileData.contactNo,
    email: storedUser.email?.trim() || initialProfileData.email,
  });

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userData = await checkSession();
        // Update profile data with fresh session data
        setProfileData(prev => ({
          ...prev,
          username: userData.username || prev.username,
          role: userData.role || prev.role,
          contactNo: userData.contactNumber || prev.contactNo,
          email: userData.email || prev.email,
        }));
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        // Session invalid, clear localStorage
        localStorage.removeItem('user');
        setProfileData(initialProfileData);
      }
    };

    // Check session on mount if user data exists in localStorage
    if (storedUser.username) {
      checkUserSession();
    }

    const handleLogin = () => {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      setProfileData(prev => ({
        ...prev,
        username: storedUser.username || prev.username,
        role: storedUser.role || prev.role,
        contactNo: storedUser.contactNumber || prev.contactNo,
        email: storedUser.email || prev.email,
      }));
    };

    const handleLogout = () => {
      setProfileData(initialProfileData);
    };

    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);
    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogout);
    };
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