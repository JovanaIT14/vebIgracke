import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <p className="welcome-text text-primary fw-semibold mb-2">Dobrodošli u Toyland!</p>
          <h1>Prodavnica igračaka za najmlađe</h1>
          <p className="lead text-muted">
            Pronađite igračke koje podstiču maštu, učenje i zabavu djece svih uzrasta.
          </p>
          <LinkContainer to="/korpa">
            <Button variant="primary">Pogledaj korpu</Button>
          </LinkContainer>
        </Col>
        <Col lg={5}>
          <div className="toyland-hero">
            <span>TOYLAND</span>
          </div>
        </Col>
      </Row>

      <section className="mt-5">
        <h2 className="h4 mb-3">Osnovne kategorije</h2>
        <Row className="g-3">
          <Col md={4}>
            <div className="info-box">Edukativne igračke</div>
          </Col>
          <Col md={4}>
            <div className="info-box">Plišane igračke</div>
          </Col>
          <Col md={4}>
            <div className="info-box">Drustvene igre</div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default HomeScreen;
