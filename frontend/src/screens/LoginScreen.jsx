import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Unesite email i lozinku.');
      return;
    }

    const isLoggedIn = login(email, password);

    if (!isLoggedIn) {
      setError('Email ili lozinka nisu ispravni.');
      return;
    }

    navigate('/profil');
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={7} lg={5}>
        <Card>
          <Card.Body>
            <h1 className="h3 mb-4">Prijava</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Unesite email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Unesite lozinku"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Prijavi se
              </Button>
            </Form>
            <p className="mt-3 mb-0">
              Nemate nalog? <Link to="/registracija">Registrujte se</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
