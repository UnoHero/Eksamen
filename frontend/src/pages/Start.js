import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNewItem } from "../hooks/useNewItem";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ItemImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const LinkButton = styled(Link)`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
`;

const Start = () => {
  const { newItem, addIsLoading, addError, tShirt, sweater } = useNewItem();

  useEffect(() => {
    newItem();
  }, []);

  if (addIsLoading) {
    return <p>Loading...</p>;
  }

  if (addError) {
    return <p>Error: {addError}</p>;
  }

  return (
    <Container>
      {sweater && (
        <ItemBox>
          <div>
            <ItemImage src={sweater.image} alt={sweater.name} />
            <h2>{sweater.name}</h2>
            <p>{sweater.description}</p>
            <p>Genre: {sweater.genre}</p>
          </div>
          <LinkButton to="/item/sweater">View Sweaters</LinkButton>
        </ItemBox>
      )}
      {tShirt && (
        <ItemBox>
          <div>
            <ItemImage src={tShirt.image} alt={tShirt.name} />
            <h2>{tShirt.name}</h2>
            <p>{tShirt.description}</p>
            <p>Genre: {tShirt.genre}</p>
          </div>
          <LinkButton to="/item/tshirt">View T-Shirts</LinkButton>
        </ItemBox>
      )}
    </Container>
  );
};

export default Start;