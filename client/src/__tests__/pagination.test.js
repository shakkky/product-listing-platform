import { setProductsPageNumber, setItemsPerProductsPage } from '../services/store/actions';

describe('setProductsPageNumber tests', () => {
    it('should create an action to set the products page number to 2', () => {
        const payload = 2;
        const expectedAction = {
            type: 'SET_PRODUCTS_PAGE_NUMBER',
            payload: payload
        };
        expect(setProductsPageNumber(payload)).toEqual(expectedAction);
    });
  
    it('should create an action to set the products page number to 24', () => {
        const payload = 24;
        const expectedAction = {
            type: 'SET_PRODUCTS_PAGE_NUMBER',
            payload: payload
        };
        expect(setProductsPageNumber(payload)).toEqual(expectedAction);
    });
});

describe('setItemsPerProductsPage tests', () => {
    it('should create an action to set the number of items on products page to 2', () => {
      const payload = 2;
      const expectedAction = {
        type: 'SET_ITEMS_PER_PRODUCTS_PAGE',
        payload: payload
      };
      expect(setItemsPerProductsPage(payload)).toEqual(expectedAction);
    });
  
    it('should create an action to set the number of items on products page to 24', () => {
      const payload = 24;
      const expectedAction = {
        type: 'SET_ITEMS_PER_PRODUCTS_PAGE',
        payload: payload
      };
      expect(setItemsPerProductsPage(payload)).toEqual(expectedAction);
    });
});