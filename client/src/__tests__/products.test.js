import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';
import { fetchProducts } from '../services/store/actions';
jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action tests', () => {
  it('creates FETCH_PRODUCTS_SUCCESS when fetching products has been done', () => {
    const testProducts = [{"id":1,"price":"$87.68","product_name":"Amitriptyline Hydrochloride","description":"synergize efficient metrics","product_image":"http://dummyimage.com/307x328.bmp/ff4444/ffffff"}];
    const mockResponse = {
        data: { body: { Items: testProducts } },
        headers: { 'content-type': 'application/json' }
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    const expectedActions = [
      { type: 'FETCH_PRODUCTS_SUCCESS', payload: testProducts }
    ]
    const store = mockStore({ products: [] })

    return store.dispatch(fetchProducts()).then(() => {
      // return of async action
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('creates FETCH_PRODUCTS_ERROR when fetching products has encountered an error', () => {
    const mockResponse = {
        status: 500
    };
    axios.get.mockImplementationOnce(() => Promise.reject(mockResponse));

    const expectedActions = [
      { type: 'FETCH_PRODUCTS_ERROR', payload: { error: { status: 500 } } }
    ]
    const store = mockStore({ products: [] })

    return store.dispatch(fetchProducts()).then(() => {
      // return of async action
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
})