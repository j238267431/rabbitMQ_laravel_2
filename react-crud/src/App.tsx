import './App.css';
import Products from './admin/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main/Main';
import ProductsCreate from './admin/components/ProductsCreate';
import ProductsUpdate from './admin/components/ProductsUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Main}/>
          <Route path='/admin/products' Component={Products}/>  
          <Route path='/admin/products/create' Component={ProductsCreate}/>  
          <Route path='/admin/products/:id/update' Component={ProductsUpdate}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
