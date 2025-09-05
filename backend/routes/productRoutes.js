import express from "express";
import { addProduct, listProducts, removeProduct, updateProduct, singleProduct } from "../controlers/productControler.js";
import upload from "../middleware/multer.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

const productRouter = express.Router();

productRouter.post('/add', 
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ])
  ,addProduct);
productRouter.get('/list', listProducts);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.put('/update', updateProduct);

export default productRouter;