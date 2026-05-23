import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  return (
    <Row className="justify-content-md-center">
      <Col md={7} lg={5}>
        <Card>
          <Card.Body>
            <h1 className="h3 mb-4">Registracija</h1>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Ime i prezime</Form.Label>
                <Form.Control type="text" placeholder="Unesite ime i prezime" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" placeholder="Unesite email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control type="password" placeholder="Unesite lozinku" />
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
