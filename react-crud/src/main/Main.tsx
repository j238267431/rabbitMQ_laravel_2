import React, { useEffect, useState } from 'react';
import { Product } from '../admin/interfaces/product';
import { json } from 'stream/consumers';


const Main = () => {

   const [products, setProducts] = useState([] as Product[]);

   const like = async (id: number) => {
      await fetch(`http://localhost:8001/api/products/${id}/like`,
         {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
         }
      );

      setProducts(products.map((p: Product) => {
         if(id === p.id){
            p.likes++;
         }
         return p;
      }))
   }

   useEffect(() => {
      ( 
         async () => {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            console.log('data', data);
            setProducts(data);
         }

      )();
   }, []);


   return (

   <main>

   <div className="album py-5 bg-body-tertiary">
      <div className="container">

         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {products.map((p: Product) => {
               return (
                  <div className="col" key={p.id}>
                  <div className="card shadow-sm">
                     <img src={p.image} height={180}/>
                     <div className="card-body">
                     <p className="card-text">{p.title}</p>
                     <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                           <button onClick={() => like(p.id)} type="button" className="btn btn-sm btn-outline-secondary">Like</button>
                        </div>
                        <small className="text-body-secondary">{p.likes} likes</small>
                     </div>
                     </div>
                  </div>
               </div>
               )
            })}
         </div>
      </div>
   </div>

   </main>
   );
};

export default Main;