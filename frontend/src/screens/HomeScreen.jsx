import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ProductCard from '../components/ProductCard';
import products from '../products';

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
        <h2 className="h4 mb-3">Katalog igračaka</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default HomeScreen;
