import { Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFoundScreen = () => {
  return (
    <>
      <h1 className="h3 mb-3">Stranica nije pronađena</h1>
      <Alert variant="warning">Ruta koju tražite ne postoji.</Alert>
      <LinkContainer to="/">
        <Button variant="primary">Početna</Button>
      </LinkContainer>
    </>
  );
};

export default NotFoundScreen;
