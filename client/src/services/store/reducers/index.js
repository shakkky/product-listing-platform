import { combineReducers } from 'redux';
import { paginationReducer } from './pagination';
import { productsReducer } from './products'

export default combineReducers({
    paginationReducer,
    productsReducer
})