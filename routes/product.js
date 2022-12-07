const express = require("express");
const Product = require("../Models/Product");
const router = express.Router();

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
  // res.status(200).json("hi occured")
});

router.get("/find", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateMobile = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateMobile);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedMobile = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedMobile);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/findBySize", async (req, res) => {
    const size = req.query.size;
  try {
    const products = await Product.find({ mobileScreenSize: { $gte: size } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/sort", async (req, res) => {
  try {
    const products = await Product.find().sort({ mobilePrice: "-1" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/query", async (req, res) => {
  const mobileCategory = req.query.category;
  const mobileCam = req.query.camera;
const ram = req.query.ram;
  try {
    let products ;
    if (mobileCategory && mobileCam) {
       products = await Product.find({mobileBrand:mobileCategory});
    } 
    else if(mobileCategory) {
       products = await Product.find({mobileBrand : mobileCategory});
    }
    else{
        products = await Product.find().sort({mobilePrice : 1})
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
