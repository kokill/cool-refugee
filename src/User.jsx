import React from 'react';
import './User.css';

const User = ({ user, openModal }) => {
  const { first_name, last_name, image, bio, origin_country, goals, profile_color, email, id, username, phone, amount_raised } = user; // eslint-disable-line
  return (
    <div className="User">
      <div className="card">
        <div className="center-container">
          <div className="image-wrapper">
            <div
              className="image-badge"
              style={{
                borderColor: `${profile_color} transparent transparent transparent`,
              }}
            >
              <img alt={first_name} src={user.image} className="avatar" />
            </div>
            <div className="amount-raised">
              <b className="font-10">Amount Raised</b>
              <br />
              <span className="amount">{amount_raised}</span>
            </div>
          </div>
          <div className="info-wrapper">
            <p>
              <b className="font-10">Name</b>
              <br />
              <span className="content">
                {first_name} {last_name}
              </span>
            </p>
            <p>
              <b className="font-10">Email</b>
              <br />
              <span className="content email">{email}</span>
              <br />
              <b className="font-10">Username</b>
              <br />
              <span className="content">{username}</span>
              <br />
              <b className="font-10">Phone</b>
              <br />
              <span className="content">{phone}</span>
              <br />
              <b className="font-10">Country</b>
              <br />
              <span className="content">{origin_country}</span>
            </p>
            <p>
              <b className="font-10">Bio</b>
              <br />
              <span>{bio}</span>
              <br />
              <b className="font-10">Goals</b>
              <br />
              <span>{goals}</span>
            </p>
          </div>
        </div>
        <button onClick={openModal} className="submit-btn add-funds">
          DONATE
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};
export default User;
