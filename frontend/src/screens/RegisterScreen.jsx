import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { register } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('Popunite sva polja.');
      return;
    }

    const isRegistered = register(name, email, password);

    if (!isRegistered) {
      setError('Korisnik sa ovom email adresom već postoji.');
      return;
    }

    navigate('/profil');
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={7} lg={5}>
        <Card>
          <Card.Body>
            <h1 className="h3 mb-4">Registracija</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Ime i prezime</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite ime i prezime"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Unesite email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Unesite lozinku"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Registruj se
              </Button>
            </Form>
            <p className="mt-3 mb-0">
              Već imate nalog? <Link to="/prijava">Prijavite se</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
