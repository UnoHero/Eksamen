import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext';

// Styled Components
const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 95%;
    top: 0;
    z-index: 1000;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Logo = styled.img`
    width: 120px;
    height: auto;
`;

const WelcomeMessage = styled.div`
    font-size: 1.1rem;
    flex-grow: 1;
    text-align: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const AuthButtons = styled.div`
    display: flex;
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
    background-color: #007bff;
`;

const SignUpButton = styled(Button)`
    background-color: #28a745;
`;

const HomeLink = styled(Button)`
    background-color: #f8f9fa;
    color: #333;
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
                ThreadTrove {username && <span>-{username}</span>}
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
