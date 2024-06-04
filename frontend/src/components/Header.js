import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext';

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
    flex: 1; // Allow the message to grow and take up remaining space
    display: flex; // Center the message horizontally
    justify-content: center; // Center the message horizontally
    align-items: center; // Center the message vertically

    @media (max-width: 768px) {
        margin: 10px 0;
    }
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 10px;
    flex: 0 0 auto; // Prevent the buttons from stretching
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

// Styling for Home Link and Log Out Button
const HomeLink = styled(Link)`
    color: #333;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: #f8f9fa;
    border: 1px solid #333;

    &:hover {
        background-color: #333;
        color: white;
    }
`;

const LogoutButton = styled.button`
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #c82333;
    }
`;

const Header = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    const storedDataString = localStorage?.getItem("user");
    const storedData = JSON.parse(storedDataString);
    const username = storedData?.userName;
    

    return (
        <HeaderContainer>
            <Link to="/">
                <Logo src="" alt="Logo" />
            </Link>
            <WelcomeMessage>
                ... {username && <span>{username}</span>}
            </WelcomeMessage>
            <AuthButtons>
                {user ? (
                    <>
                        <HomeLink to={"/home"}>Home</HomeLink>
                        <LogoutButton onClick={handleClick}>Log Out</LogoutButton>
                    </>
                ) : (
                    <>
                        <LoginButton to="/login">Login</LoginButton>
                        <SignUpButton to="/signup">Sign Up</SignUpButton>
                    </>
                )}
            </AuthButtons>
        </HeaderContainer>
    );
}

export default Header;
