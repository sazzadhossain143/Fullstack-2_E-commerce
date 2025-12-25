import { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products } = useContext<any>(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category , setCategory] = useState<string[]>([]);
  const [subCategory , setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("");


  const toggleCategory = (e: any) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e: any) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const filterByCategory = () => {
    let updatedList = products.slice(); 
    if(category.length > 0) {
      updatedList = updatedList.filter((item: any) => 
        category.includes(item.category)
      );
    }
    if(subCategory.length > 0) {
      updatedList = updatedList.filter((item: any) => 
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(updatedList);
  };

  const sortProduct = () => {
    const fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a:any, b:any) => (a.price - b.price)));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a:any, b:any) => (b.price - a.price)));
        break;

      default:
        filterByCategory();
        break;
    }
  };

  useEffect(() => {
    filterByCategory();
  }, [category, subCategory]); 
  
  
  useEffect(() => {
    sortProduct();
  }, [sortType]);


  // useEffect(() => {
  //   setFilterProducts(products);
  // }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Men" onChange={toggleCategory} /> Men
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Women" onChange={toggleCategory}/> Women
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Kids" onChange={toggleCategory}/> Kids
            </label>
          </div>
        </div>
        {/* subCategories Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"
            } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Topwear" onChange={toggleSubCategory}/> Topwear
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Bottomwear" onChange={toggleSubCategory}/> Bottomwear
            </label>
            <label className="flex gap-2">
              <input className="w-3" type="checkbox" value="Winterwear" onChange={toggleSubCategory}/> Winterwear
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          {/* Product Sort */}
          <select onChange={(e:any)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant" >Sort by: Relevant</option>
            <option value="low-high" >Sort by: Low to High</option>
            <option value="high-low" >Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.map((item: any, index: number) => (
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))} 
        </div>

      </div>



    </div>

  )
}

export default Collection
