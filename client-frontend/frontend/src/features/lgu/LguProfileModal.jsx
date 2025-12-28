import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { LguProfileContext } from '../../context/LguProfileContext';
import userDefaultSvg from '../../assets/user-default.svg';
import '../../styles/resident/profileModal.css';

const LguProfileModal = ({ isOpen, onClose }) => {
  const { profileData, updateProfile } = useContext(LguProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const navigate = useNavigate();

  // Update editedData when profileData changes
  if (profileData !== editedData && !isEditing) {
    setEditedData(profileData);
  }

  if (!isOpen) return null;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveProfile = () => {
    updateProfile(editedData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/signin');
    }, 1200);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="profile-modal-overlay" onClick={onClose}>
        <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-profile-btn" onClick={onClose}>✕</button>

          <div className="profile-header">
            <img
              src={editedData.profilePicture || userDefaultSvg}
              alt="Profile"
              className="profile-avatar"
            />
            <div className="profile-username">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={editedData.username}
                  onChange={handleEditChange}
                  className="profile-input"
                />
              ) : (
                <h2>{editedData.username}</h2>
              )}
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-field">
              <label>Role:</label>
              <span>{editedData.role}</span>
            </div>

            <div className="profile-field">
              <label>Contact No.:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="contactNo"
                  value={editedData.contactNo}
                  onChange={handleEditChange}
                  className="profile-input"
                />
              ) : (
                <span>{editedData.contactNo}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleEditChange}
                  className="profile-input"
                />
              ) : (
                <span>{editedData.email}</span>
              )}
            </div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <button className="profile-btn save-btn" onClick={handleSaveProfile}>
                Save Profile
              </button>
            ) : (
              <button className="profile-btn edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
            <button className="profile-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LguProfileModal;