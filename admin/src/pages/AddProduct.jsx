import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export default function AddProduct({token}) {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setIsBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      const res = await axios.post( backendUrl + "/product/add", formData, { headers: {token}})
      console.log(res);
      if(res.data.success){
        toast.success(res.data.message)
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setIsBestSeller(false);
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
return (
  <div>
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3' >
      <p>Uplode Image</p>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
        </label>
        <label htmlFor="image2">
          <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
        </label>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='px-3 py-2 w-full max-w-[500px]' type="text" placeholder='Enter product name' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='px-3 py-2 w-full max-w-[500px]' type="text" placeholder='Write here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Category</p>
        <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-2 w-full max-w-[500px]' required>
          <option value="">Select category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Sub Category</p>
        <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='px-3 py-2 w-full max-w-[500px]' required>
          <option value="">Select subcategory</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
          {/* Add more subcategories as needed */}
        </select>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='px-3 py-2 w-full max-w-[500px]' type="number" min="0" placeholder='Enter price' required />
      </div>
      <div >
        <p className='mb-2'>Product sizes</p>
        <div className='flex gap-2'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(size => size !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(size => size !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(size => size !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(size => size !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(size => size !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <input onChange={ () => setIsBestSeller( prev => !prev ) } checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-gray-500 text-white rounded ' >ADD</button>
    </form>
  </div>
)
}
