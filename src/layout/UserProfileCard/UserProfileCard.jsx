// src/layout/UserProfileCard/UserProfileCard.jsx
import React from "react";
import styles from "./UserProfileCard.module.css"; // Assuming you have a CSS module for it

const UserProfileCard = ({ imageUrl, name, className }) => {
  return (
    <div className={`${styles.userProfileCard} ${className}`}>
      <img src={imageUrl} alt="User Avatar" className={styles.userAvatar} />
      <span className={styles.userName}>{name}</span>
    </div>
  );
};

export default UserProfileCard;
