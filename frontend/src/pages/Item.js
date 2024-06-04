import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItem } from "../hooks/useItem";
import styled from "styled-components";


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

const Item = () => {
    let { id } = useParams();
    const { Item, addIsLoading, addError, itemData } = useItem();

    useEffect(() => {
        Item(id);
    }, [id]);

    if (addIsLoading) {
        return <p>Loading...</p>;
    }

    if (addError) {
        return <p>Error: {addError}</p>;
    }

    return (
        <ItemContainer>
            <h2>{itemData.name}</h2>
            <p>Description: {itemData.description}</p>
            <p>Genre: {itemData.genre}</p>
            <ItemImage src={itemData.image} alt={itemData.name} />
        </ItemContainer>
    );
}

export default Item;
