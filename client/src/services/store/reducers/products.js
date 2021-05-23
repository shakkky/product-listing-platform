
const initialState = {
    products: [],
    error: null
};

export const productsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_PRODUCTS_SUCCESS': // We use AXIOS to grab this data from REST service
            return {
                ...state,
                products: action.payload
              };
        case 'FETCH_PRODUCTS_ERROR': // Hook for us to use if we want to let our users know that our service is temporaily down
            return {
                ...state,
                error: action.payload.error,
                products: []
              };
        default: // default return statement, always good to have
            return state;
    }
}
