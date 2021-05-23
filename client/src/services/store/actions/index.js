import axios from 'axios';

export const fetchProducts = () => {
    return (async(dispatch) => {
        try {
            const resp = await axios.get(`http://localhost:3001/api/products`);
            dispatch({
                type: 'FETCH_PRODUCTS_SUCCESS',
                payload: resp.data.body
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_PRODUCTS_ERROR',
                payload: {
                    error
                }
            });
        }
    });
}

export const setProductsPageNumber = (payload) => {
    return {
        type: 'SET_PRODUCTS_PAGE_NUMBER',
        payload: payload
    }
}
export const setItemsPerProductsPage = (payload) => {
    return {
        type: 'SET_ITEMS_PER_PRODUCTS_PAGE',
        payload: payload
    }
}