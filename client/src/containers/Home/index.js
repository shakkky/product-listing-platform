import React from 'react';
import ProductPanel from '../../components/ProductPanel';
import './Home.scss';

const Home = () => {
  return (
    <div>
      <section>
        <div className="panel-container">
          <ProductPanel />
        </div>
      </section>
    </div>
  );
}

export default Home;