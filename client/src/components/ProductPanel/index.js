import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../services/store/actions';
import { Container, Row, Col } from 'react-bootstrap';
import ProductItem from '../ProductItem';
import PaginationBar from '../PaginationBar';
import PaginationDropdown from '../PaginationDropdown';
import './ProductPanel.scss';

const ProductPanel = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const currentPage = useSelector((state) => state.paginationReducer.productsPageNumber);
  const productsPerPage = useSelector((state) => state.paginationReducer.itemsPerProductsPage);
  const dispatch = useDispatch();

  // Calculate current products
  const indexOfLastProduct= currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="header-container">
        <div className="header-title">
          <p><b>All Products</b></p>
        </div>
        <div className="header-subtitle">
          <p>{products.length} Products</p>
          <div className="right">
            <PaginationDropdown/>
          </div>
        </div>
      </div>
      <div className="grid-container">
        <Container fluid>
          <Row>
            {currentProducts.map(item => (
              <div key={item.id} className="grid-item-container">
                <Col lg={4} md={4} sm={2} xs={1} className="fill-col h-100">
                  <ProductItem item={item} />
                </Col>
              </div>
            ))}
          </Row>
        </Container>
      </div>
      <div className='pagination-container'>
        <PaginationBar/>
      </div>
    </div>
  );
}

export default ProductPanel;