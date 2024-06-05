import React, { useState } from "react";
import styled from "styled-components";

import FrontPage from "../img/FrontPage.png";
import Catalogue from "../img/Catalogue.png";
import Item from "../img/NotAdminItem.png";
import Login from "../img/Login.png";
import Signup from "../img/Signup.png";

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
`;

const GuideImage = styled.img`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ExpandedImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  border: 2px solid #fff;
  border-radius: 8px;
`;

const Help = () => {
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <>
      <GuideContainer>
        <h2>Welcome to Rockit - Your Clothing Webstore</h2>

        <h3>Home Page</h3>
        <GuideImage src={FrontPage} alt="Home Page" onClick={() => handleImageClick(FrontPage)} />
        <p>
          <strong>1. Header:</strong> The header section contains navigation links to various parts of the website.
        </p>
        <p>
          <strong>2. Newest Items:</strong> This section displays two t-shirts and one sweater, with corresponding buttons to view the full catalogue.
        </p>

        <h3>Catalogue</h3>
        <GuideImage src={Catalogue} alt="Catalogue" onClick={() => handleImageClick(Catalogue)} />
        <p>
          <strong>1. Items:</strong> You will see all the items in the selected category. Click on images to view their details.
        </p>

        <h3>Item Page</h3>
        <GuideImage src={Item} alt="Item Page" onClick={() => handleImageClick(Item)} />
        <p>
          <strong>1. Item Details:</strong> View detailed information about the selected item. Click on images to see more.
        </p>

        <h3>Login Page</h3>
        <GuideImage src={Login} alt="Login Page" onClick={() => handleImageClick(Login)} />
        <p>
          <strong>1. Login:</strong> Registered users can log in with their username and password to access their account.
        </p>
        <p>
          <strong>2. Sign Up:</strong> New users can create an account by clicking on the "Sign Up" link.
        </p>

        <h3>Sign Up Page</h3>
        <GuideImage src={Signup} alt="Sign Up Page" onClick={() => handleImageClick(Signup)} />
        <p>
          <strong>1. Sign Up Form:</strong> Fill out the required information to create a new account, including username, email, and password.
        </p>
        <p>
          <strong>2. Already have an account?</strong> Navigate back to the login page using the provided link if you already have an account.
        </p>

        {expandedImage && (
          <ExpandedImageContainer onClick={handleCloseExpandedImage}>
            <ExpandedImage src={expandedImage} alt="Expanded View" />
          </ExpandedImageContainer>
        )}
      </GuideContainer>
    </>
  );
}

export default Help;
