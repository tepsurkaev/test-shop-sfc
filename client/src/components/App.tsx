import React from 'react';
import '../styles/app.css';
import Header from './header/Header';
import Products from './Products';

function App() {
  return (
    <div className="content">
      <div>
        <Header />
      </div>
      <Products />
    </div>
  );
}

export default App;
