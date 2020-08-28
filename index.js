const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  ApiResult
} = require('./utils/ApiResult');
const {HttpResponse} = require('./utils/HttpResponse');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:1234@cluster-vbvb.oc096.mongodb.net/vbvb-db?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	auto_reconnect: true
})
let db = mongoose.connection
db.on('error', function (error) {
	console.log(`MongoDB connection error! : ${JSON.stringify(error)}`)
	mongoose.disconnect()
})
db.once('open', function () {
	console.log(`MongoDB connection opened!`)
})
db.on('disconnected', function () {
	console.log('MongoDB disconnected!')
	mongoose.connect("mongodb+srv://admin:1234@cluster-vbvb.oc096.mongodb.net/vbvb-db?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		auto_reconnect: true
	})
})

const port = 50000;
app.listen(port, () => {
  console.log("vbvb :::" + port);
});

app.use('/', require("./router/index"))

app.use(require("./validator/ErrorHandler"))
app.use((err,req, res, next) => {
  let apiResult = new ApiResult();
  apiResult.status = HttpResponse.ERROR;
  apiResult.message = HttpResponse.ERROR_MSG;
  res.status(HttpResponse.NOTFOUND).json(apiResult);
});
app.use((req, res, next) => {
  let apiResult = new ApiResult();
  apiResult.status = HttpResponse.NOTFOUND;
  apiResult.message = HttpResponse.ERROR_MSG;
  res.status(HttpResponse.NOTFOUND).json(apiResult);
});