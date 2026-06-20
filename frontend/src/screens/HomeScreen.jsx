import { useMemo, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../productStorage';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { toUiProduct } from '../utils/productAdapter';

const HomeScreen = () => {
  const { data: backendProducts, isError } = useGetProductsQuery();
  const fallbackProducts = useMemo(() => getProducts(), []);
  const products = backendProducts && !isError ? backendProducts.map(toUiProduct) : fallbackProducts;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(products.map((product) => product.kategorija))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.naziv.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.kategorija === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <p className="welcome-text text-primary fw-semibold mb-2">Dobrodošli u Toyland!</p>
          <h1>Toyland prodavnica igračaka</h1>
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
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
          <h2 className="h4 mb-0">Katalog igračaka</h2>
          <Form className="catalog-filter">
            <Row className="g-2">
              <Col md={7}>
                <Form.Control
                  type="text"
                  placeholder="Pretraži po nazivu"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </Col>
              <Col md={5}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  <option value="">Sve kategorije</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </div>

        {filteredProducts.length === 0 ? (
          <Alert variant="warning">Nema igračaka koje odgovaraju pretrazi.</Alert>
        ) : (
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
