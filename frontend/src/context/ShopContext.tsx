import { createContext, useState } from "react";
import { products } from "../assets/assets";

// Create the context
export const ShopContext = createContext(null);

// Define the provider component
const ShopContextProvider = (props:any) => {
  const currency = "$";
  const deliveryCharge = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const value : any = {
    products,
    currency,
    deliveryCharge,
    search,
    setSearch,
    showSearch,
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
