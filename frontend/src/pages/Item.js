import React, { useEffect } from "react";
import { useParams, redirect } from "react-router-dom";
import styled from "styled-components";
import { useItem } from "../hooks/useItem";
import { useAdmin } from "../hooks/useAdmin";
import { useDelete } from "../hooks/useDelete";

const ItemContainer = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 400px;
    text-align: center;
    margin: 9% auto; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
`;

const ItemImage = styled.img`
    max-width: 100%;
    border-radius: 5px;
    margin: 10px 0;
`;

const Button = styled.button`
    margin: 10px;
    padding: 5px 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledButton = styled(Button)`
    margin: 0 10px;
`;

const Item = () => {
    let { id } = useParams();
    const { Item, addIsLoading, addError, itemData } = useItem();
    const { admin, adminIsLoading, adminError, answer } = useAdmin();
    const { del, delIsLoading, delError } = useDelete();

    useEffect(() => {
        admin();
    }, []); 

    useEffect(() => {
        Item(id);
    }, [id]);

    const handleDelete = async () => {
        try {
            await del(id); 
            if (!delError) {
                window.location.href = "/"
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Deletion failed:", error);
        }
    };
    

    const handleEdit = () => {
        // Logic for editing the item
    };

    if (addIsLoading) {
        return <p>Loading...</p>;
    }

    if (addError) {
        return <p>Error: {addError }</p>;
    }

    return (
        <ItemContainer>
            <h2>{itemData.name}</h2>
            <p>Description: {itemData.description}</p>
            <p>Genre: {itemData.genre}</p>
            <ItemImage src={itemData.image} alt={itemData.name} />
            {answer && (
                <ButtonContainer>
                    <StyledButton onClick={handleDelete}>Delete</StyledButton>
                    <StyledButton onClick={handleEdit}>Edit</StyledButton>
                </ButtonContainer>
            )}
        </ItemContainer>
    );
}

export default Item;
