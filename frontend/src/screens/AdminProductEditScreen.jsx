import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getProducts, saveProducts } from '../productStorage';

const AdminProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products] = useState(getProducts);
  const { currentUser } = useUser();
  const isNewProduct = !id || id === 'novi';
  const product = products.find((item) => item.id === id);
  const [naziv, setNaziv] = useState(product?.naziv || '');
  const [slika, setSlika] = useState(product?.slika || '');
  const [opis, setOpis] = useState(product?.opis || '');
  const [cijena, setCijena] = useState(product?.cijena || '');
  const [kategorija, setKategorija] = useState(product?.kategorija || '');
  const [uzrast, setUzrast] = useState(product?.uzrast || '');
  const [materijal, setMaterijal] = useState(product?.materijal || '');
  const [brojNaStanju, setBrojNaStanju] = useState(product?.brojNaStanju || '');
  const [rating, setRating] = useState(product?.rating || '');
  const [error, setError] = useState('');

  if (!currentUser || !currentUser.isAdmin) {
    return <Alert variant="danger">Nemate pristup administratorskom dijelu.</Alert>;
  }

  if (!isNewProduct && !product) {
    return <Alert variant="warning">Proizvod nije pronađen.</Alert>;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      naziv === '' ||
      slika === '' ||
      opis === '' ||
      cijena === '' ||
      kategorija === '' ||
      uzrast === '' ||
      materijal === '' ||
      brojNaStanju === '' ||
      rating === ''
    ) {
      setError('Popunite sva polja.');
      return;
    }

    const savedProduct = {
      ...(product || {}),
      id: product?.id || Date.now().toString(),
      naziv,
      slika,
      opis,
      cijena: Number(cijena),
      kategorija,
      uzrast,
      materijal,
      brojNaStanju: Number(brojNaStanju),
      rating: Number(rating),
    };
    const updatedProducts = isNewProduct
      ? [...products, savedProduct]
      : products.map((item) => (item.id === product.id ? savedProduct : item));

    saveProducts(updatedProducts);

    navigate('/admin/proizvodi');
  };

  return (
    <>
      <LinkContainer to="/admin/proizvodi">
        <Button variant="outline-primary" className="mb-3">
          Nazad
        </Button>
      </LinkContainer>
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <h1 className="h3 mb-4">{isNewProduct ? 'Dodavanje igračke' : 'Izmjena igračke'}</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="naziv">
                  <Form.Label>Naziv</Form.Label>
                  <Form.Control value={naziv} onChange={(event) => setNaziv(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="slika">
                  <Form.Label>Slika</Form.Label>
                  <Form.Control value={slika} onChange={(event) => setSlika(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="opis">
                  <Form.Label>Opis</Form.Label>
                  <Form.Control as="textarea" rows={3} value={opis} onChange={(event) => setOpis(event.target.value)} />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cijena">
                      <Form.Label>Cijena</Form.Label>
                      <Form.Control type="number" step="0.01" value={cijena} onChange={(event) => setCijena(event.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="kategorija">
                      <Form.Label>Kategorija</Form.Label>
                      <Form.Control value={kategorija} onChange={(event) => setKategorija(event.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="uzrast">
                      <Form.Label>Uzrast</Form.Label>
                      <Form.Control value={uzrast} onChange={(event) => setUzrast(event.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="materijal">
                      <Form.Label>Materijal</Form.Label>
                      <Form.Control value={materijal} onChange={(event) => setMaterijal(event.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="brojNaStanju">
                      <Form.Label>Broj na stanju</Form.Label>
                      <Form.Control type="number" value={brojNaStanju} onChange={(event) => setBrojNaStanju(event.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control type="number" step="0.5" value={rating} onChange={(event) => setRating(event.target.value)} />
                </Form.Group>
                <Button type="submit" variant="primary">
                  {isNewProduct ? 'Dodaj proizvod' : 'Sačuvaj izmjene'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminProductEditScreen;
