import { Badge, Card } from 'react-bootstrap';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card my-3">
      <Card.Img
        src={product.slika}
        variant="top"
        alt={product.naziv}
        className="product-card-img"
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Card.Title as="h3" className="product-title mb-0">
            {product.naziv}
          </Card.Title>
          <Badge bg={product.brojNaStanju > 0 ? 'success' : 'secondary'}>
            {product.brojNaStanju > 0 ? 'Na stanju' : 'Nema'}
          </Badge>
        </div>
        <Card.Text className="product-description text-muted">{product.opis}</Card.Text>
        <Rating value={product.rating} text={`${product.rating} / 5`} />
        <Card.Text as="div" className="product-meta mt-3">
          <div>Kategorija: {product.kategorija}</div>
          <div>Uzrast: {product.uzrast}</div>
          <div>Materijal: {product.materijal}</div>
          <div>Na stanju: {product.brojNaStanju}</div>
        </Card.Text>
        <Card.Text as="h4" className="product-price mt-3">
          {product.cijena.toFixed(2)} KM
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
