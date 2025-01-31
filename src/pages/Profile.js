import React, { useState } from "react";
import "../styles/Profile.css";
import { FaEdit, FaSave, FaLinkedin, FaTwitter, FaUserCircle } from "react-icons/fa";

function Profile() {
  // State for user data
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+27 123 456 7890",
    bio: "Experienced software engineer, passionate about innovative tech solutions and solving complex problems.",
    profilePic: "https://www.w3schools.com/w3images/avatar2.png", // Placeholder image
    location: "Johannesburg, South Africa",
    dob: "1980-05-22",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/johndoe/",
      twitter: "https://twitter.com/johndoe",
    },
  });

  // Handle input change for profile fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle save button click
  const handleSave = () => {
    // Logic to save changes (e.g., API call)
    toggleEdit();
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button onClick={toggleEdit} className="edit-btn">
          <FaEdit /> {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-overview">
        {/* Profile Picture */}
        <div className="profile-pic">
          <img
            src={userData.profilePic}
            alt="Profile"
            className="profile-pic-img"
          />
          {isEditing && (
            <div className="upload-pic">
              <label htmlFor="uploadPic" className="upload-label">
                Change Picture
              </label>
              <input
                type="file"
                id="uploadPic"
                onChange={(e) => handleInputChange(e)}
                className="upload-input"
              />
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="profile-info">
          <h3>Personal Information</h3>
          <div className="profile-item">
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>
          <div className="profile-item">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
          <div className="profile-item">
            <label>Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div className="profile-item">
            <label>Location:</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userData.location}</p>
            )}
          </div>
          <div className="profile-item">
            <label>Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>

          {/* Social Links */}
          <h3>Social Links</h3>
          <div className="social-links">
            <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={30} color="#0077B5" />
            </a>
            <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter size={30} color="#1DA1F2" />
            </a>
          </div>

          {/* Bio */}
          <div className="profile-item">
            <label>Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                className="profile-input bio-input"
              />
            ) : (
              <p>{userData.bio}</p>
            )}
          </div>

          {/* Save Changes Button */}
          {isEditing && (
            <button onClick={handleSave} className="save-btn">
              <FaSave /> Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
