import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../slices/productsApiSlice';
import { toApiProduct, toUiProduct } from '../utils/productAdapter';

const AdminProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const isNewProduct = !id || id === 'novi';
  const { data: backendProduct, isError } = useGetProductDetailsQuery(id, {
    skip: isNewProduct,
  });
  const { data: backendProducts } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const cachedProduct = backendProducts?.find((item) => item._id === id);
  const product =
    backendProduct && !isError ? toUiProduct(backendProduct) : cachedProduct ? toUiProduct(cachedProduct) : null;
  const [naziv, setNaziv] = useState('');
  const [slika, setSlika] = useState('');
  const [opis, setOpis] = useState('');
  const [cijena, setCijena] = useState('');
  const [kategorija, setKategorija] = useState('');
  const [uzrast, setUzrast] = useState('');
  const [materijal, setMaterijal] = useState('');
  const [brojNaStanju, setBrojNaStanju] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setNaziv(product.naziv || '');
      setSlika(product.slika || '');
      setOpis(product.opis || '');
      setCijena(product.cijena || '');
      setKategorija(product.kategorija || '');
      setUzrast(product.uzrast || '');
      setMaterijal(product.materijal || '');
      setBrojNaStanju(product.brojNaStanju || '');
      setRating(product.rating || '');
    }
  }, [product]);

  if (!currentUser || !currentUser.isAdmin) {
    return <Alert variant="danger">Nemate pristup administratorskom dijelu.</Alert>;
  }

  if (!isNewProduct && isError) {
    return <Alert variant="warning">Proizvod nije pronadjen.</Alert>;
  }

  const submitHandler = async (event) => {
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

    const productData = toApiProduct({
      naziv,
      slika,
      opis,
      cijena,
      kategorija,
      uzrast,
      materijal,
      brojNaStanju,
      rating,
    });

    if (isNewProduct) {
      await createProduct(productData).unwrap();
    } else {
      await updateProduct({ ...productData, _id: id }).unwrap();
    }

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
              <h1 className="h3 mb-4">{isNewProduct ? 'Dodavanje igracke' : 'Izmjena igracke'}</h1>
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
                  {isNewProduct ? 'Dodaj proizvod' : 'Sacuvaj izmjene'}
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
