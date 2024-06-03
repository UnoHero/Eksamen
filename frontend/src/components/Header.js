// Header.js
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from "react-router-dom";

// Styled Components
const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Logo = styled.img`
    width: 150px; // Adjust as needed
    height: auto; // Maintain aspect ratio
`;

const WelcomeMessage = styled.div`
    font-size: 1.2rem;
    text-align: center;
    flex: 1;

    @media (max-width: 768px) {
        margin: 10px 0;
    }
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const LoginButton = styled(Link)`
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background-color: #0056b3;
    }
`;

const SignUpButton = styled(Link)`
    padding: 5px 10px;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background-color: #218838;
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Link to="/">
                <Logo src="" alt="Logo" />
            </Link>
            <WelcomeMessage>Welcome</WelcomeMessage>
            <AuthButtons>
                <LoginButton to="/login">Login</LoginButton>
                <SignUpButton to="/signup">Sign Up</SignUpButton>
            </AuthButtons>
        </HeaderContainer>
    );
}

export default Header;


