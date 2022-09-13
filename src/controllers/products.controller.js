import Product from "../model/Product";

export const createProduct = async (req, res) => {
    console.log(req.body);
    const {name, category, price, imgURL} = req.body;
    const newProduct = new Product({name, category, price, imgURL});
    const productSave = await newProduct.save();
    res.status(201).json(productSave);

}
export const getProducts = async (req, res) => {
    const products = await Product.find();
  return res.json(products);

}
export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
  
    await Product.findByIdAndDelete(productId);
  
    res.status(204).json();
  };
export const getProductById = async (req, res) => {
    const { productId } = req.params;
  
    const product = await Product.findById(productId);
    res.status(200).json(product);
  };

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  };