import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    console.log(name, description, price, category, subCategory, sizes, bestseller);
    // console.log(image1, image2, image3, image4);

    const images = [image1, image2, image3, image4].filter(img => img !== undefined).map(img => img.path);

    let imageUrl = await Promise.all(images.map(async (img) => {
      const result = await cloudinary.uploader.upload(img, {
        resource_type: "image",
      });
      return result.secure_url;
    }));
    console.log(imageUrl);

    const productData = {
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category,
      subCategory,
      // sizes: sizes ? sizes.split(',').map(size => size.trim()) : [],
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === 'true' ? true : false,
      date: Date.now()
    };
    console.log(productData);

    // Save productData to your database here (e.g., MongoDB)
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({}) //.sort({ createdAt: -1 });
    res.json({ success: true, products })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const removeProduct = async (req, res) => {
 try {
  await productModel.findByIdAndDelete(req.body.id)
  res.json({success:true, message:"Product removed successfully"})
 } catch (error) {
  console.log(error);
  res.json({success:false, message:error.message})
 }
}

const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success:true, product})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}

const updateProduct = async (req, res) => {

}


export { addProduct, listProducts, removeProduct, updateProduct, singleProduct } 