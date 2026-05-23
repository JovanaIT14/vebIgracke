import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-top bg-light">
      <Container>
        <Row>
          <Col className="py-3 text-center text-muted">
            &copy; {currentYear} Toyland. Sva prava zadržana.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
