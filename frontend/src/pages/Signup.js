import React, { useState } from 'react';
import { useSignup } from "../hooks/useSignup";
import { Link, Navigate } from "react-router-dom";
import styled from 'styled-components';

// Styled Components
const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;

const SignupForm = styled.form`
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

const SignupButton = styled.button`
    padding: 0.75rem;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

const Signup = () => {
    const [honeypot, setHoneypot] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [userName, setUserName] = useState("");
    const { signup, error, isLoading, isSuccess } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot || !passwordsMatch) {
            // If the honeypot field is filled or passwords don't match, ignore submission
            console.log("Passwords do not match");
            return;
        }
        // Handle actual signup submission
        //console.log('Form submitted');
        await signup(userName, password);
    };
    
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    return (
        <SignupContainer>
            {isSuccess && <Navigate to="/" />}
            <SignupForm onSubmit={handleSubmit}>
                <Title>Sign Up</Title>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" onChange={handleUserNameChange} required />
                
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                
                {/* Honeypot field */}
                <HoneyPot>
                    <Label htmlFor="honeypot">Do not fill this field</Label>
                    <Input type="text" id="honeypot" name="honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </HoneyPot>

                {!passwordsMatch && <Error>Passwords do not match</Error>}
                <SignupButton disabled={isLoading} type="submit">Sign Up</SignupButton>
            </SignupForm>
        </SignupContainer>
    );
};

export default Signup;
