import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCategory } from '../hooks/useCategory';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
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
  height: auto;
`;

const Name = styled.h3`
  margin: 10px 0;
`;

const Description = styled.p`
  color: #555;
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
              <Box key={item._id}>
                <Image src={item.image} alt={item.name} />
                <Name>{item.name}</Name>
                <Description>{item.description}</Description>
              </Box>
            ))}
          </Grid>
        );
      case 'sweater':
        return (
          <Grid>
            {categoryData.newSet.map((item) => (
              <Box key={item._id}>
                <Image src={item.image} alt={item.name} />
                <Name>{item.name}</Name>
                <Description>{item.description}</Description>
              </Box>
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
