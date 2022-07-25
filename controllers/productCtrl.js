const Products = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString){
    this.query = query;
    this.queryString = queryString
  }
  filtering(){
    const queryObj = {...this.queryString};
    const excludeFields = ['page', 'sort', 'limit']
    excludeFields.forEach(element => delete(queryObj[element]))
    
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    
    this.query.find(JSON.parse(queryStr))

    return this;
  }
  sorting(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join('')
      this.query = this.query.sort(sortBy)
    }else{
      this.query = this.query.sort('-createdAt')
    }
    return this
  }
  paginating(){
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 100
    const skip = (page - 1) * limit; 
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
      const products = await features.query 
        
      res.json({
          status: "성공",
          result: products.length,
          products: products,
        });

    }catch(err){
      return res.status(500).json({ msg: err.message });
    }
    
  },
  createProducts: async (req, res) => {
    try {
      const { title, description, price, images, category } = req.body;
      if (!images)
        return res.status(400).json({ msg: "이미지가 업로드 되지 않았습니다" });

      const newProduct = new Products({
        title: title.toLowerCase(),
        price,
        description,
        images,
        category
      });

      await newProduct.save();
      res.json({ msg: "제폼 생성됨" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "제품 삭제됨" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const { title, description, images, price, category } = req.body;
      if (!images)
        return res.status(400).json({ msg: "이미지가 업로드 되지 않았습니다" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          description,
          price,
          images,
          category
        }
      );

      res.json({ msg: "제품 수정됨" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;