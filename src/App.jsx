import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Buscador from './assets/components/Buscador';
import MiApi from './assets/components/MiApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <body className="py-5 bg-dark text-light">
      <Container className="py-5 bg-dark text-light">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h1 className="text-center mb-4 text-success">Lista de Personajes de Rick y Morty</h1>
            <Buscador handleSearch={handleSearch} />
            <MiApi searchTerm={searchTerm} />
          </Col>
        </Row>
      </Container>
      </body>
  );
};

export default App;
