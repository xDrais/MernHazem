const asynHandler = require("express-async-handler")
const Product = require('../Models/product.js')
const path = require("path");

const createProduct = asynHandler(async (req, res) => {
 
      const {  
        productName ,
        price , 
        category , 
        countInStock ,
        description,
        user
      } = req.body
      const  imageProduct =req.file.filename 

      if (!productName || isNaN(price) || !category || isNaN(countInStock) || !description) {
        res.json({"message":"Please add  all fields"}).status(402)
            throw new Error('Please add  all fields')
    }
     
    const product = await Product.create({
      productName ,
            price , 
            user,
            category , 
            countInStock ,
            description,imageProduct
    })
   
   if(product){
      res.status(201).json({
          _id: product.id,
          productName: product.productName,
          user : product.user,
          price: product.price,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
          imageProduct: product.imageProduct
      })
  }
 
  else{
      res.status(400)
      throw new Error('Invalid user data')
  }

})



const getAllProducts = asynHandler(async(req,res)=>{
    
  const product = await Product.find( {}).populate('user');
  if (!product) {
      res.Error(404)
      throw new Error(" Product Not Found !!")
  }
  res.json(product)

})
const getProductById = asynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const GetProductsById = asynHandler(  async (req, res) => {
  try {
    const product = await Product.find( { user: req.params.userId } ).populate('user'); 
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


const deleteProduct = asynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json("Product removed" )
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateProduct = asynHandler(async (req, res) => {
  
  console.log('req.file:', req.file);
  console.log('req.body:', req.body);
  const {
    productName,
    price,
    description,
    category,
    countInStock
  } = req.body
 const  imageProduct =req.file?
 req.file.filename: null;

  const product = await Product.findById(req.params.id)

  if (product) {
    product.productName = productName
    product.price = price
    product.description = description
    product.category = category
    product.countInStock = countInStock
    product.imageProduct = imageProduct

    const updatedProduct = await product.save()
    if (updatedProduct){
      res.status(201).json({
        _id: product.id,
        productName: product.productName,
        user : product.user,
        price: product.price,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
        imageProduct: product.imageProduct
      })
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getProductByIdProduct = asynHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId)

  if (product) {
    res.json({
      _id: product.id,
      productName: product.productName,
      user : product.user,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
      imageProduct: product.imageProduct
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const SearchProduct = asynHandler( async (req, res) => {
  const key = req.params.key;
  
  const productResults = await Product.find({
    $or: [
      { name: { $regex:  new RegExp(key, 'i')  } },
      { category: { $regex:  new RegExp(key, 'i')  } },
      { description: { $regex:  new RegExp(key, 'i')  } },
    ],
  });

  const results = productResults;
  
  res.send(results);
});

//@Desc : If the user hasn't already reviewed the product, it creates a new review object with the user's name, rating, comment, and user id. It then pushes the new review into the reviews array of the product object, updates the numReviews field to reflect the new number of reviews, and calculates the new rating by taking the average of all the review ratings. 
//Create Review 
//@Route : POST /product/:id/reviews 
//@Access : Private 


const createReview = asynHandler(async (req, res) => {
  const {
   rating , comment 
  } = req.body

  const product = await Product.findById(req.params.id) //It proceeds to find the product by its id using Product.findById()

  if (product) {
   const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
   if (alreadyReviewed){
    res.status(400)
    throw new Error ('Product Already Reviewed')
   }
   const review ={
    name : req.user.firstName,
    rating : Number(rating),
    comment,
    user : req.user._id
   }
     product.reviews.push(review)
     product.numReviews = product.reviews.length 
     product.rating =product.reviews.reduce((acc , item)=> item.rating + acc , 0 )/
     product.reviews.length
     await product.save()
//   const updatedProduct = await product.save()
    res.status(201).json({ message : "Review added"})
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})


module.exports = { 
   createProduct,
   getAllProducts,
   deleteProduct,
   updateProduct,
   SearchProduct,
   GetProductsById,
   getProductById,
   createReview,
   getProductByIdProduct

}
  