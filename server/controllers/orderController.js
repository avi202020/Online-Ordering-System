const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const orderModel = require("../models/OrderSchema");


exports.orderCreate = asyncHandler(async(req, res, next) => {
    // Add user to req,body

  req.body.user = req.user.id;

  const newOrder = await orderModel.create(req.body);

  res.status(200)
  .json({ success: true, data: newOrder.id})
})


// @desc      Get orders
// @route     GET /order?shipppingStatus=Unshipped&sort=totalPrice
// req.query === axios.params
// @access    Public
exports.getordersByUserID = asyncHandler(async (req, res, next) => {
  let queryOrders;

  // console.log(req.query);


  // get query
  let reqQuery = {...req.query}

  // Fields to exclude
  const removeFields = ['sort'];

  // Loop over removeFields and delete unneeded fields from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  
  // add User ID to the query
  reqQuery.user = req.user.id

  if (reqQuery.shippingStatus !== "") {
    reqQuery.shippingStatus = req.query.shippingStatus.split(',')    
  } else {
    delete reqQuery['shippingStatus']
  }


  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // const removeFields
  queryOrders = orderModel.find(JSON.parse(queryStr))



  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.join(',');
    queryOrders = queryOrders.sort(sortBy);
  } else {
    queryOrders = queryOrders.sort('firstName');
  }

  const ordersByUserId = await queryOrders;

  if (!ordersByUserId) {
    return next(
      new ErrorResponse(`Orders not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: ordersByUserId})
});