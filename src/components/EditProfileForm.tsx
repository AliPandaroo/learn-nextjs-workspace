"use client";

import React, { useEffect } from "react";
import {
  useEditProfileState, // SLICE
  ProfileFields, // TYPE
} from "../states/edit-profile-slice";

const EditProfileForm = () => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    updateProfile,
    batchUpdateProfile,
    resetProfile,
  } = useEditProfileState();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log("handleInputChange");
    const { name, value } = e.target; // input's name
    updateProfile(name as keyof ProfileFields, value);
  };

  const handleReset = () => {
    resetProfile();
  };

  const handleBatchUpdate = (data: Partial<ProfileFields>) => {
    batchUpdateProfile({
      firstName:
        data.firstName ||
        (data.fullName ? data.fullName.split(" ")[0] : firstName),
      lastName:
        data.lastName ||
        (data.fullName ? data.fullName.split(" ")[1] : lastName),
      email: data.email || email,
      phone: data.phone || phone,
      address: data.address || address,
    });
  };

  const initiateUser = () => {
    // Fetch user data and update the state
    fetch("https://679b599233d3168463238bab.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        handleBatchUpdate(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    initiateUser();
  }, []);

  return (
    <div>
      <h1>Form to edit profile</h1>
      <form>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          {address.country && (
            <div>
              <label>Country</label>
              <select
                name="country"
                id=""
                value={address.country}
                onChange={handleInputChange}
              >
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
              </select>
            </div>
          )}
          {address.city && (
            <div>
              <label>City</label>
              <select
                name="country"
                id=""
                value={address.city}
                onChange={handleInputChange}
              >
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
              </select>
            </div>
          )}

          <label>
            Address:
            <textarea
              rows={4}
              name="address"
              value={address.fullAddress}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <button type="button" onClick={handleReset}>
          Reset Profile
        </button>

        {/* You can add a submit button if needed */}
      </form>
    </div>
  );
};

export default EditProfileForm;
