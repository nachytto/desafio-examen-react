import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const MiApi = ({ searchTerm }) => {
  const [characters, setCharacters] = useState([]);//estado lista de personajees de la api
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para el orden de clasificación (ascendente o descendente)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'https://rickandmortyapi.com/api/character';
        if (searchTerm) {
          apiUrl += `/?name=${searchTerm}`;
        } else {
          const response = await axios.get('https://rickandmortyapi.com/api/character/?page=1');
          const totalPages = response.data.info.pages;
          const randomPage = Math.floor(Math.random() * totalPages) + 1;
          apiUrl += `/?page=${randomPage}`;
        }
        const response = await axios.get(apiUrl);
        const charactersWithDetails = await Promise.all(response.data.results.map(async (character) => {
          const episodeIds = character.episode.map((episodeUrl) =>
            parseInt(episodeUrl.substring(episodeUrl.lastIndexOf('/') + 1))
          );
          const episodesResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds[0]}`);
          const episodeData = episodesResponse.data;
          return {
            ...character,
            firstAppearance: episodeData.name,
            status: character.status === 'Alive' ? 'Vivo' : 'Muerto',
            season: episodeData.episode.substring(1, 3),
          };
        }));
        setCharacters(charactersWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]); // Se ejecuta al montar el componente y cuando cambia searchTerm

  // Función para ordenar los personajes alfabéticamente
  const handleSort = () => {
    const sortedCharacters = [...characters].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setCharacters(sortedCharacters);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Cambia el orden de clasificación
  };

  return (
    <div>
      <div className="text-center mb-3">
        <button onClick={handleSort}>
          Ordenar por nombre {sortOrder === 'asc' ? 'ascendente' : 'descendente'}
        </button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {characters.map((character) => (
          <Col key={character.id}>
            <Card>
              <Card.Img variant="top" src={character.image} alt={character.name} />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>Species: {character.species}</Card.Text>
                <Card.Text>Primera aparición: {character.firstAppearance}</Card.Text>
                <Card.Text>Estado: {character.status}</Card.Text>
                <Card.Text>Temporada: {character.season}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MiApi;
