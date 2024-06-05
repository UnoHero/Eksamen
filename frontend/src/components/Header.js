import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext';

// Styled Components
const HeaderContainer = styled.header`
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    top: 0;
    z-index: 1000;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Logo = styled.img`
    grid-column: 1 / span 2;
    width: 120px;
    height: auto;
`;

const WelcomeMessage = styled.div`
    grid-column: 8 / span 2;
    font-size: 1.3rem;
    text-align: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const AuthButtons = styled.div`
    grid-column: 15 / span 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    @media (max-width: 768px) {
        gap: 5px;
    }
`;

const Button = styled(Link)`
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    color: white;

    &:hover {
        opacity: 0.8;
    }
`;

const LoginButton = styled(Button)`
    grid-column: 1 / span 1;
    background-color: #007bff;
`;

const SignUpButton = styled(Button)`
    grid-column: 2 / span 1;
    background-color: #28a745;
`;

const HomeLink = styled(Button)`
    background-color: #f8f9fa;
    color: #333;
    border: 1px solid #333;
    grid-column: 1 / span 1;

    &:hover {
        background-color: #333;
        color: white;
    }
`;

const LogoutButton = styled(Button)`
    background-color: #d62436;
    color: white;
    border: 1px solid #333;
    grid-column: 2 / span 1;

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
                <Logo src="" alt="Rockit Logo" />
            </Link>
            <WelcomeMessage>
                Rockit {username && <span>-{username}</span>}
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
