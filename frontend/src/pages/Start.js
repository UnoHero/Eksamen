import React, { useEffect } from "react";
import styled from "styled-components";
import { useNewItem } from "../hooks/useNewItem";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ItemImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
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
          <h2>{sweater.name}</h2>
          <p>{sweater.description}</p>
          <p>Genre: {sweater.genre}</p>
          <ItemImage src={sweater.image} alt={sweater.name} />
        </ItemBox>
      )}
      {tShirt && (
        <ItemBox>
          <h2>{tShirt.name}</h2>
          <p>{tShirt.description}</p>
          <p>Genre: {tShirt.genre}</p>
          <ItemImage src={tShirt.image} alt={tShirt.name} />
        </ItemBox>
      )}
    </Container>
  );
};

export default Start;