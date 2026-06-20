import { useMemo, useState } from 'react';
import { Alert, Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';
import { getProducts } from '../productStorage';
import { useGetProductDetailsQuery, useGetProductsQuery } from '../slices/productsApiSlice';
import { toUiProduct } from '../utils/productAdapter';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: backendProduct, isError, isFetching, isLoading } = useGetProductDetailsQuery(id, {
    skip: id.length < 12,
  });
  const { data: backendProducts } = useGetProductsQuery();
  const fallbackProducts = useMemo(() => getProducts(), []);
  const [quantity, setQuantity] = useState(1);
  const cachedBackendProduct = backendProducts?.find((item) => item._id === id);
  const product =
    backendProduct && !isError
      ? toUiProduct(backendProduct)
      : cachedBackendProduct
        ? toUiProduct(cachedBackendProduct)
        : fallbackProducts.find((item) => item.id === id);
  const isBackendProduct = id.length >= 12;
  const isProductLoading =
    isBackendProduct && !backendProduct && !cachedBackendProduct && !isError && (isLoading || isFetching);

  if (isProductLoading) {
    return <Alert variant="info">Ucitavanje proizvoda...</Alert>;
  }

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

  const addToCartHandler = () => {
    addToCart(product, quantity);
    navigate('/korpa');
  };

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
            <ListGroup.Item>
              <Row className="align-items-center">
                <Col>Količina</Col>
                <Col>
                  <Form.Select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                    {[...Array(product.brojNaStanju).keys()].map((number) => (
                      <option key={number + 1} value={number + 1}>
                        {number + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Button
            variant="primary"
            className="mt-3"
            disabled={product.brojNaStanju === 0}
            onClick={addToCartHandler}
          >
            Dodaj u korpu
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
