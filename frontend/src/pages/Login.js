// Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

// Styled Components
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;

const LoginForm = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
`;

const HoneyPot = styled.div`
    display: none;
`;

const Error = styled.div`
    color: red;
    margin-bottom: 1rem;
`;

const LoginButton = styled.button`
    padding: 0.75rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Login = () => {
    const [honeypot, setHoneypot] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) {
            // If the honeypot field is filled, it's a bot
            return;
        }
        // Handle actual login submission
        //console.log('Form submitted');
        await login(userName, password)
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" onChange={handleUserNameChange} required />
                
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" onChange={handlePasswordChange} required />
                
                {/* Honeypot field */}
                <HoneyPot>
                    <Label htmlFor="honeypot">Do not fill this field</Label>
                    <Input type="text" id="honeypot" name="honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </HoneyPot>
                
                {error && <Error>{error}</Error>}
                <LoginButton disabled={isLoading} type="submit">Login</LoginButton>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;



