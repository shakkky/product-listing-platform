
const initialState = {
    productsPageNumber: 1,
    itemsPerProductsPage: 8,
    itemsPerProductsPageOptions: [4, 8, 16, 32]
};

export const paginationReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_PRODUCTS_PAGE_NUMBER':
            return {
                ...state,
                productsPageNumber: action.payload
            };
        case 'SET_ITEMS_PER_PRODUCTS_PAGE':
            return {
                ...state,
                itemsPerProductsPage: action.payload
            };
        default:
            return state;
    }
}