import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import './ShowAtms.css';
import PointIcon from '../assets/point-icon.svg';
import MapContainerWrapper from './MapResults';

const ShowAtms = ({ results, error, request, resetSearch }) => {
  return (
    <Row className="justify-content-center mt-2">
      <Col md={6}>
        <div className="card">
          <div className="card-body">
            {(results.length > 0) ?
              results.map(atm => {
                return (
                  <Row key={atm.id} className="border-bottom px-2 py-3">
                    <Col xs={9}>
                      <Row>
                        <Col xs={12} className="banc-title pb-2">{atm.banco}</Col>
                        <Col xs={12} className="dir-text">{atm.ubicacion}, {atm.barrio}</Col>
                      </Row>
                    </Col>
                    <Col xs={3} className="align-self-center distance-text">
                      <img className="point-icon" src={PointIcon} alt="point-icon"></img>
                  A {atm.dist.toFixed()} metros
                </Col>
                  </Row>
                )
              }) : error ?
                <Alert variant="danger">{error}</Alert>
                : <Alert variant="warning" className="mb-3">
                  <Alert.Heading>No hay resultados para tu búsqueda!</Alert.Heading>
                  <p>
                    Intenta una nueva búsqueda
              </p>
                </Alert>}
            <Button variant="info" type="button" className="mt-3" onClick={() => resetSearch()}>Nueva búsqueda</Button>
          </div>
        </div>
      </Col>
      {results.length > 0 ?
      <Col md={6} className="pl-4">
        <MapContainerWrapper currentLocation={request} results={results} />
      </Col> 
      : null
      }
    </Row>
  );
}

export default ShowAtms;