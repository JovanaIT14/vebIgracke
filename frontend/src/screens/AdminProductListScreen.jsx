import { useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { getProducts, saveProducts } from '../productStorage';

const AdminProductListScreen = () => {
  const [products, setProducts] = useState(getProducts);
  const { currentUser } = useUser();

  const deleteProduct = (id) => {
    const shouldDelete = window.confirm('Da li ste sigurni da želite obrisati proizvod?');

    if (!shouldDelete) {
      return;
    }

    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  if (!currentUser || !currentUser.isAdmin) {
    return <Alert variant="danger">Nemate pristup administratorskom dijelu.</Alert>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Admin proizvodi</h1>
        <LinkContainer to="/admin/proizvodi/novi">
          <Button variant="primary">
            <FaPlus className="me-1" />
            Dodaj proizvod
          </Button>
        </LinkContainer>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Kategorija</th>
            <th>Cijena</th>
            <th>Stanje</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.naziv}</td>
              <td>{product.kategorija}</td>
              <td>{product.cijena.toFixed(2)} KM</td>
              <td>{product.brojNaStanju}</td>
              <td className="text-end">
                <LinkContainer to={`/admin/proizvodi/${product.id}/uredi`}>
                  <Button variant="light" className="me-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button variant="light" onClick={() => deleteProduct(product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminProductListScreen;
