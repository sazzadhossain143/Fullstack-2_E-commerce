// import React from 'react'

import { useState, useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function LatestCollection() {

  const {products} = useContext<any>(ShopContext);
  
  console.log(products);

  const [LatestProducts, setLatestProducts] =  useState<any[]>([]);

  useEffect(() => {
    const latest = products.slice(0,10);
    setLatestProducts(latest);
  }, [products]);
  
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {LatestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>

    </div>

  )
}
