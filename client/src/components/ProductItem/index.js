import React from 'react';
import './ProductItem.scss';

const ProductItem = (props) => {

  return (
    <div className="item-container">
      <div className="img-container">
        <img src={props.item.product_image} alt={`Display for ${props.item.product_name}`}/>
      </div>
      <div className="info-container-outer">
        <div className="info-container">
          <div className="info-box">
            <div className="title-container">
              <p><b>{props.item.product_name}</b></p>
            </div>
            <div className="description-container">
              <p>{props.item.description}</p>
              <p><b>{props.item.price}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;