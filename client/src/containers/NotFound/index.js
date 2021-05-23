import React from 'react';
import logo from '../../assets/logo.png';
import { Button } from 'react-bootstrap';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div>
      <section className="col">
        <div className="header">
          <img src={logo} alt="logo"/>
          <h1>Oops, looks like there was a problem</h1>
          <p>The page you were looking for doesn't exist yet!</p>
        </div>
        <div className="container-sm">
          <Button variant="primary" type="submit" size="lrg" onClick={(e) => window.location.href="/"} block>
              Take me back
          </Button>
        </div>
      </section>
    </div>
  );
}

export default NotFound