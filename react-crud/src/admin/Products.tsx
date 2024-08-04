import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { Product } from './interfaces/product';
import { log } from 'console';
import { Link } from 'react-router-dom';
const Products = () => {


   const [products, setProducts] = useState([]);
   const [loader, setLoader] = useState(false);
   const [clickedId, setClickedId] = useState<number>();
   useEffect(() => {
      ( 
         async () => {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();

            setProducts(data);
         }

      )();
   }, []);


   const del = async (id: number) =>{
      if(window.confirm('Are you shure you want to delete the product?')){
         setLoader(true);
         await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE'
         });
         setProducts(products.filter((p: Product) => p.id !== id))
         setLoader(false);
      }
      
   }

   return (
 
      <Wrapper>
         <div className="d-flex justify-content-start mx-2 my-2" >
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3"><Link className='text-white' to="/admin/products/create">Add product</Link></button>
         </div>
         <div className="table-responsive small">
            <table className="table table-striped table-sm">
               <thead>
                  <tr> 
                  <th scope="col">#</th>
                  <th scope="col">image</th>
                  <th scope="col">title</th>
                  <th scope="col">likes</th>
                  <th scope="col">action</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((p:  Product) => {
                     return (

                        <tr key = {p.id}>
                           <td>{p.id}</td>
                           <td><img src={p.image} height="180"/></td>
                           <td>{p.title}</td>
                           <td>{p.likes} </td>
                           <td>
                           <Link to={`/admin/products/${p.id}/update`} className="btn btn-info rounded-pill px-3" type="button">
                              <span data-id={p.id}>Update</span>
                           </Link>
                           <button data-id={p.id} onClick={(e: React.ChangeEvent<any>) => {
                              setClickedId(e.target.dataset['id'])
                              del(p.id)
                              {console.log(e.target.dataset['id'])}
                           }
                              
                           } className="btn btn-danger rounded-pill px-3" type="button">
                              
                              {(loader && (p.id == clickedId) )
                                 ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                                 : <span data-id={p.id}>Delete</span>
                                 
                               }
                           </button>
                           </td>

                        </tr>
                     )
                  })}

               </tbody>
            </table>
         </div>
      </Wrapper>
   );
};

export default Products;