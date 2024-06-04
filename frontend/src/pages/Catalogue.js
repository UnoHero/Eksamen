import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCategory } from '../hooks/useCategory';
import { Link } from "react-router-dom";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 100px 200px 0 200px;
  justify-content: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 100px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 50px;
  }
`;

const Box = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Name = styled.h3`
  margin: 10px 0;
`;

const Description = styled.p`
  color: #555;
`;

const Linked = styled(Link) `
  text-decoration: none;
  color: black;
`;


const Catalogue = () => {
  const { kategori } = useParams();
  const { searchCategory, addIsLoading, addError, categoryData } = useCategory();

  useEffect(() => {
    searchCategory(kategori);
  }, [kategori]);

  if (addIsLoading) {
    return <p>Loading...</p>;
  }

  if (addError) {
    return <p>Error: {addError}</p>;
  }

  const renderContent = () => {
    if (!categoryData || !Array.isArray(categoryData.newSet)) {
      return <div>Invalid data format</div>;
    }

    switch (kategori) {
      case 't-shirt':
        return (
          <Grid>
            {categoryData.newSet.map((item) => (
              <Linked key={item._id} to={`/${item._id}`}>
                <Box>
                  <Image src={item.image} alt={item.name} />
                  <Name>{item.name}</Name>
                  <Description>{item.description}</Description>
                </Box>
              </Linked>
            ))}
          </Grid>
        );
      case 'sweater':
        return (
          <Grid>
            {categoryData.newSet.map((item) => (
              <Linked key={item._id} to={`/${item._id}`}>
                <Box >
                  <Image src={item.image} alt={item.name} />
                  <Name>{item.name}</Name>
                  <Description>{item.description}</Description>
                </Box>
              </Linked>
            ))}
          </Grid>
        );
      default:
        return <div>Invalid category</div>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Catalogue;
