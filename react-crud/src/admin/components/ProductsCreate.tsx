import React, { SyntheticEvent, useState } from 'react';
import Wrapper from '../Wrapper';
import { Navigate } from 'react-router-dom';

const ProductsCreate = () => {
   const [title, setTitle] = useState('');
   const [image, setImage] = useState('');
   const [redirect, setRedirect] = useState(false);
const submit = async (e: SyntheticEvent) => {
   e.preventDefault();

   try {
      await fetch('http://localhost:8000/api/products', 
         {
            method: 'POST',
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
               <input type="text" className="form-control" id="title" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
               <label htmlFor="exampleInputPassword1">Image</label>
               <input type="text" className="form-control" id="image" placeholder="Image" onChange={e => setImage(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Create</button>
            </form>
      </Wrapper>
   );
};

export default ProductsCreate;