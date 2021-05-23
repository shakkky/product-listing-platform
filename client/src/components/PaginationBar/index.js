import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setProductsPageNumber } from '../../services/store/actions';
import { Pagination } from 'react-bootstrap';
import './PaginationBar.scss';

const PaginationBar = () => {
    const pageNumbers = [];
    const products = useSelector((state) => state.productsReducer.products);
    const currentPage = useSelector((state) => state.paginationReducer.productsPageNumber);
    const productsPerPage = useSelector((state) => state.paginationReducer.itemsPerProductsPage);
    const dispatch = useDispatch();
    var maxPageOptions = 3;
    var maxPageOffset;
    var pageOptions = [];

    for (let i = 1; i <= Math.ceil(products.length/productsPerPage); i++){
        pageNumbers.push(i);
    }

    for (var i = 1; i < pageNumbers.length+1; i++){
        if (currentPage === pageNumbers[0] | currentPage === pageNumbers.length){
            maxPageOffset = Math.ceil(maxPageOptions/2);
        } else {
            maxPageOffset = Math.floor(maxPageOptions/2);
        }
        if (i >= currentPage-maxPageOffset && i <= currentPage+maxPageOffset){
            pageOptions.push(i);
        }
    }

    return (
        <Pagination>
            <Pagination.Prev disabled={currentPage <= pageNumbers[0]} onClick={(e) => {e.preventDefault(); dispatch(setProductsPageNumber(currentPage-1));}}>
                {'< Previous Page'}
            </Pagination.Prev>
             {pageOptions.map((number) => (
                 <Pagination.Item key={number} active={number === currentPage} onClick={(e) => {e.preventDefault(); dispatch(setProductsPageNumber(number));}} href='!#'>{number}</Pagination.Item>
             ))}
            <Pagination.Next disabled={currentPage >= pageNumbers.length} onClick={(e) => {e.preventDefault(); dispatch(setProductsPageNumber(currentPage+1));}}>
                {'Next Page >'}
            </Pagination.Next>
        </Pagination>
    )
}

export default PaginationBar;