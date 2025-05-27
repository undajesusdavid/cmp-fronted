import React from "react";
import "./UserProfileCard.module.css"; // Asegúrate de que la ruta sea correcta

const UserProfileCard = ({ imageUrl, name }) => {
  return (
    <div className="user-profile-card">
      <div className="user-profile-image-container">
        {/*<img
          src={imageUrl}
          alt={`Foto de perfil de ${name}`}
          className="user-profile-image"
        />*/}
      </div>
      <h3 className="user-profile-name">{name}</h3>
    </div>
  );
};

export default UserProfileCard;
