import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdd } from "../hooks/useAdd";

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormContainer = styled.div`
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`;

const Select = styled.select`
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Home = () => {
    const [apparelName, setApparelName] = useState('');
    const [image, setApparelImgUrl] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const { add, addIsLoading, addError, ok } = useAdd();

    const handleAddAparel = async (e) => {
        e.preventDefault();
        // Pass the necessary values to the add function
        try {
            await add(apparelName, image, genre, description);
            if (!addError) {
                //window.location.href = "/"
            }
        } catch (error) {
            console.error("Failed to add:", error);
        }
    };



    return (
        <HomeContainer>
            <FormContainer>
                <Form onSubmit={handleAddAparel}>
                    <Label htmlFor="apparelName">Apparel Name:</Label>
                    <Input type="text" id="apparelName" value={apparelName} onChange={(e) => setApparelName(e.target.value)} required />

                    <Label htmlFor="apparelImgUrl">Apparel Image URL:</Label>
                    <Input type="url" id="apparelImgUrl" value={image} onChange={(e) => setApparelImgUrl(e.target.value)} required />

                    <Label htmlFor="genre">Genre:</Label>
                    <Select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                        <option value="">Select Genre</option>
                        <option value="t-shirt">T-Shirt</option>
                        <option value="sweater">Sweater</option>
                    </Select>

                    <Label htmlFor="description">Apparel Description:</Label>
                    <TextArea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={100} required />

                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>
            </FormContainer>
        </HomeContainer>
    );
};

export default Home;
