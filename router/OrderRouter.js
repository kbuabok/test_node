const express = require("express");
const router = express.Router();
const OrderModel = require("../model/OrderModel");
const {
  ApiResult
} = require('../utils/ApiResult');
const {HttpResponse} = require('../utils/HttpResponse');
const validate = require('../validator/Validate')
const schema = require('../validator/OrderValidator')

router.get("/", (req, res) => {
    let apiResult = new ApiResult();
    OrderModel.find().exec((err, data) => {
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
    OrderModel.findById(req.params._id).populate("products").exec((err, data) => {
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

router.delete("/:_id", (req, res) => {
    let apiResult = new ApiResult();
    OrderModel.findByIdAndDelete(req.params._id, (err, data) => {
      if (err) {
        apiResult.status = HttpResponse.ERROR;
        apiResult.message = err;
        return res.status(HttpResponse.ERROR).json(apiResult);
      }
      apiResult.status = HttpResponse.OK;
      apiResult.message = "delete order success";
      res.status(HttpResponse.OK).json(apiResult);
    });
  });

router.post("/", (req, res) => {
    let apiResult = new ApiResult();
    let obj = new OrderModel(req.body);
    obj.save((err, data) => {
      if (err) {
        apiResult.status = HttpResponse.ERROR;
        apiResult.message = err;
        return res.status(HttpResponse.ERROR).json(apiResult);
      }
      apiResult.status = HttpResponse.OK;
      apiResult.message = "create new order success";
      res.status(HttpResponse.OK).json(apiResult);
    });
  });

module.exports = router;