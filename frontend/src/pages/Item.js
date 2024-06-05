import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useItem } from "../hooks/useItem";
import { useAdmin } from "../hooks/useAdmin";
import { useDelete } from "../hooks/useDelete";
import { useUpdate } from "../hooks/useUpdate"; // Assuming you have a hook for updating

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

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    margin: 5px 0;
    padding: 5px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    margin: 5px 0;
    padding: 5px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const HiddenHoneypot = styled.input`
    display: none;
`;

const Item = () => {
    let { id } = useParams();
    const { Item, addIsLoading, addError, itemData } = useItem();
    const { admin, adminIsLoading, adminError, answer } = useAdmin();
    const { del, delIsLoading, delError } = useDelete();
    const { update, updateIsLoading, updateError } = useUpdate();

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({
        name: '',
        description: '',
        genre: '',
        image: ''
    });
    const [honeypot, setHoneypot] = useState(''); // Honeypot field

    useEffect(() => {
        admin();
    }, []);

    useEffect(() => {
        Item(id);
    }, [id]);

    useEffect(() => {
        if (itemData) {
            setEditedItem(itemData);
        }
    }, [itemData]);

    const handleDelete = async () => {
        try {
            await del(id);
            if (!delError) {
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Deletion failed:", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // If honeypot field is filled, do nothing
        if (honeypot) {
            console.log("Bot detected");
            return;
        }

        try {
            await update(id, editedItem);
            if (!updateError) {
                setIsEditing(false);
                Item(id); 
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    if (addIsLoading) {
        return <p>Loading...</p>;
    }

    if (addError) {
        return <p>Error: {addError}</p>;
    }

    return (
        <ItemContainer>
            {isEditing ? (
                <EditForm onSubmit={handleFormSubmit}>
                    <Input
                        type="text"
                        name="name"
                        value={editedItem.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <TextArea
                        name="description"
                        value={editedItem.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                    <Input
                        type="text"
                        name="genre"
                        value={editedItem.genre}
                        onChange={handleInputChange}
                        placeholder="Genre"
                    />
                    <Input
                        type="text"
                        name="image"
                        value={editedItem.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                    {/* Honeypot field */}
                    <HiddenHoneypot type="text" id="honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

                    <Button type="submit">Save</Button>
                    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                </EditForm>
            ) : (
                <>
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
                </>
            )}
        </ItemContainer>
    );
}

export default Item;
