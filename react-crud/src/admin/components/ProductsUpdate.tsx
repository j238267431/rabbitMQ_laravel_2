import React, { PropsWithRef, SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../Wrapper';
import { Navigate, useParams } from 'react-router-dom';
import { Product } from '../interfaces/product';

const ProductsUpdate = (props: PropsWithRef<any>) => {
   const [title, setTitle] = useState('');
   const [image, setImage] = useState('');
   const [redirect, setRedirect] = useState(false);
   const { id } = useParams()

useEffect(() => {
   console.log(id);
   (

      async () => {
         const response = await fetch(`http://localhost:8000/api/products/${id}`);
         const product: Product = await response.json();
         setTitle(product.title);
         setImage(product.image);
         console.log('product', product);
      }
   )();
   ( 
      async () => {
         const response = await fetch('http://localhost:8000/api/products');
         const data = await response.json();

         // setProducts(data);
      }

   )();
},[]);
const submit = async (e: SyntheticEvent) => {
   e.preventDefault();

   try {
      await fetch(`http://localhost:8000/api/products/${id}`, 
         {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               title,
               image
            }) 
   
         });
         setRedirect(true);
   } catch (error) {
      console.log('api/products error', error);
   }

}

if(redirect){
   return <Navigate to='/admin/products' />
}

   return (
      <Wrapper>
         <form onSubmit={submit}>
            <div className="form-group">
               <label htmlFor="exampleInputEmail1">Title</label>
               <input type="text" className="form-control" id="title" placeholder="Title" onChange={e => setTitle(e.target.value)} defaultValue={title}/>
            </div>
            <div className="form-group">
               <label htmlFor="exampleInputPassword1">Image</label>
               <input type="text" className="form-control" id="image" placeholder="Image" onChange={e => setImage(e.target.value)} defaultValue={image}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Update</button>
            </form>
      </Wrapper>
   );
};

export default ProductsUpdate;