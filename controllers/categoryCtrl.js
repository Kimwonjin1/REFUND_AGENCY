const Category = require("../models/categoryModel");
const Products = require("../models/productModel")


const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
    const categories = await Category.find()
        res.json(categories)
    }catch(err){
      return res.status(500).json({ msg: err.message });
    }
    
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({name})
      if (category)
        return res.status(400).json({ msg: "태그 업로드 실패" });

      const newCategory = new Category({name})

      await newCategory.save()
      res.json({ msg: "제폼 생성됨" });
    
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({category:req.params.id})
      if(products) return res.status(400).json({
        msg: "현재 업로드된 파일에 태그가 적용되어 있습니다 관련 파일을 제거후 다시 실행해 주십시요"
      })
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "태크 삭제됨" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
        await Category.findOneAndUpdate({_id: req.params.id}, {name})
        res.json({msg:"태그 업데이트 완료"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
