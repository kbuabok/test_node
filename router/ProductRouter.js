const express = require("express");
const router = express.Router();
const ProductModel = require("../model/ProductModel");
const {
  ApiResult
} = require('../utils/ApiResult');
const {HttpResponse} = require('../utils/HttpResponse');
const validate = require('../validator/Validate')
const schema = require('../validator/ProductValidator')

router.get("/", (req, res) => {
  let apiResult = new ApiResult();
  ProductModel.find().exec((err, data) => {
    if (err) {
      apiResult.status = HttpResponse.ERROR;
      apiResult.message = err;
      return res.status(HttpResponse.ERROR).json(apiResult);
    }
    apiResult.status = HttpResponse.OK;
    apiResult.message = HttpResponse.OK_MSG;
    apiResult.data = data;
    res.status(HttpResponse.OK).json(apiResult);
  });
});

router.get("/:_id", (req, res) => {
  let apiResult = new ApiResult();
  ProductModel.findById(req.params._id).exec((err, data) => {
    if (err) {
      apiResult.status = HttpResponse.ERROR;
      apiResult.message = err;
      return res.status(HttpResponse.ERROR).json(apiResult);
    }
    apiResult.status = HttpResponse.OK;
    apiResult.message = HttpResponse.OK_MSG;
    apiResult.data = data;
    res.status(HttpResponse.OK).json(apiResult);
  });
});

router.post("/", validate(schema.product),(req, res) => {
  let apiResult = new ApiResult();
  let obj = new ProductModel(req.body);
  obj.save((err, data) => {
    if (err) {
      apiResult.status = HttpResponse.ERROR;
      apiResult.message = err;
      return res.status(HttpResponse.ERROR).json(apiResult);
    }
    apiResult.status = HttpResponse.OK;
    apiResult.message = "create new product success";
    res.status(HttpResponse.OK).json(apiResult);
  });
});

router.put("/:_id", (req, res) => {
  let apiResult = new ApiResult();
  ProductModel.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) {
      apiResult.status = HttpResponse.ERROR;
      apiResult.message = err;
      return res.status(HttpResponse.ERROR).json(apiResult);
    }
    apiResult.status = HttpResponse.OK;
    apiResult.message = "update product success";
    res.status(HttpResponse.OK).json(apiResult);
  });
});

router.delete("/:_id", (req, res) => {
  let apiResult = new ApiResult();
  ProductModel.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) {
      apiResult.status = HttpResponse.ERROR;
      apiResult.message = err;
      return res.status(HttpResponse.ERROR).json(apiResult);
    }
    apiResult.status = HttpResponse.OK;
    apiResult.message = "delete product success";
    res.status(HttpResponse.OK).json(apiResult);
  });
});
  
module.exports = router;

