import React, { useEffect, useState } from 'react';
import { Product } from '../admin/interfaces/product';
import { Tag } from '../admin/interfaces/tag';
import { json } from 'stream/consumers';


const Main = () => {
   const [allProducts, setAllProducts] = useState([] as Product[]);
   const [products, setProducts] = useState([] as Product[]);
   const [tags, setTags] = useState([] as Tag[]);
   const [choosedTag, setChoosedTag] = useState(Number);
   const [choosedTagClass, setChoosedTagClass] = useState('btn btn-primary');

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

   const filterProductsByTag = (tag_id: number) => {
      console.log('filterProductsByTag');
      let filteredProducts = allProducts.filter((product) => {
         if(product.tags !== null) return product!.tags.tag_id == tag_id
      } );
      setProducts(filteredProducts);
      setChoosedTag(tag_id);
   }

   const showAll = () => {
      setProducts(allProducts);
      setChoosedTag(0);
   } 

   useEffect(() => {
      ( 
         async () => {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            console.log('data', data);
            setProducts(data);
            setAllProducts(data);
         }
         

      )();
   }, []);

   useEffect(() => {
      ( 
         async () => {
            const response = await fetch('http://localhost:8000/api/tags');
            const data = await response.json();
            console.log('data', data);
            setTags(data);
         }
      )();
   }, []);


   return (

   <main>

   <div className="album py-5 bg-body-tertiary">
      <div className="container">
         <div className='d-flex justify-content-between mb-2'>
         <button onClick={() => showAll()} type="button" className="btn btn-success">clean filter</button>
            {
               tags.map((t: Tag) => {
                  return (
                     <button onClick={() => filterProductsByTag(t.id)} type="button" className={`btn ${t.id == choosedTag ? 'btn-secondary' : 'btn-primary'}`}>{t.name}</button>
                  )
               })
            }

         </div>
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