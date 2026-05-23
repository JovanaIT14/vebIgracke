import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <Row className="justify-content-md-center">
      <Col md={7} lg={5}>
        <Card>
          <Card.Body>
            <h1 className="h3 mb-4">Prijava</h1>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" placeholder="Unesite email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control type="password" placeholder="Unesite lozinku" />
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
