import { Alert, Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <>
        <Alert variant="warning">Proizvod nije pronađen.</Alert>
        <LinkContainer to="/">
          <Button variant="primary">Nazad na početnu</Button>
        </LinkContainer>
      </>
    );
  }

  return (
    <>
      <LinkContainer to="/">
        <Button variant="outline-primary" className="mb-4">
          Nazad na katalog
        </Button>
      </LinkContainer>

      <Row className="g-4">
        <Col md={6}>
          <Image src={product.slika} alt={product.naziv} fluid rounded className="product-detail-img" />
        </Col>
        <Col md={6}>
          <h1 className="h2">{product.naziv}</h1>
          <Rating value={product.rating} text={`${product.rating} / 5`} />
          <p className="lead text-muted mt-3">{product.opis}</p>
          <ListGroup variant="flush" className="product-detail-list">
            <ListGroup.Item>Cijena: {product.cijena.toFixed(2)} KM</ListGroup.Item>
            <ListGroup.Item>Kategorija: {product.kategorija}</ListGroup.Item>
            <ListGroup.Item>Uzrast: {product.uzrast}</ListGroup.Item>
            <ListGroup.Item>Materijal: {product.materijal}</ListGroup.Item>
            <ListGroup.Item>Broj na stanju: {product.brojNaStanju}</ListGroup.Item>
          </ListGroup>
          <LinkContainer to="/korpa">
            <Button variant="primary" className="mt-3" disabled={product.brojNaStanju === 0}>
              Dodaj u korpu
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
