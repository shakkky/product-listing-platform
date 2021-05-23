import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setItemsPerProductsPage } from '../../services/store/actions';
import { Dropdown } from 'react-bootstrap';
import './PaginationDropdown.scss';

const PaginationDropdown = () => {
    const options = useSelector((state) => state.paginationReducer.itemsPerProductsPageOptions);
    const productsPerPage = useSelector((state) => state.paginationReducer.itemsPerProductsPage);
    const dispatch = useDispatch();
    return (
        <Dropdown id="custom-dropdown">
            <Dropdown.Toggle id="custom-button" size="sm">
                {`${productsPerPage} posts per page`}
            </Dropdown.Toggle>
                <Dropdown.Menu id="custom-menu">
                    {options.map(size => (
                        <Dropdown.Item key={size} eventKey={size} onSelect={(e) => dispatch(setItemsPerProductsPage(e))}>{size}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
        </Dropdown>
    )
}

export default PaginationDropdown;