import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


export default function ProductList({token}) {
  const [products, setProducts] = useState([])
  
  const fatchProducts = async () => {
    try {
      const res = await axios.get( backendUrl + "/product/list")
      console.log(res);
      if(res.data.success){
        setProducts(res.data.products)
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const res = await axios.post( backendUrl + "/product/remove", {id}, { headers: {token}})
      console.log(res);
      if(res.data.success){
        toast.success(res.data.message)
        await fatchProducts()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fatchProducts()
  }, [products])

  return (
    <div>
      <h2 className='text-lg font-bold mb-2 '>All Products List </h2>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'> 
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {products.map( (product) => (
        <div key={product._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 text-sm my-2'>
          <img className='w-16 h-16 object-contain' src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>₹ {product.price}</p>
          <div className='flex justify-center gap-2 cursor-pointer '> 
            <div onClick={() => removeProduct(product._id)} className='w-[30px]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
