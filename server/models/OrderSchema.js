const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  orderItems: [
    {
      itemName: {
        type: String,
        required: [true, "Please select the item name"]
      },
      servingSize: {
        type: String,
        required: [true, "Please select a serving size"],
        enum: ["Small", "Medium", "Large"]
      },
      sugarLevel: {
        type: String,
        required: [true, "Please select a sugar level"],
        enum: ["No Sugar", "50% Sugar", "Standard Sugar", "Extra Sugar"]
      },
      toppings: {
        type: Array
      }
    }
  ],
  firstName: {
    type: String,
    required: [true, "Please enter the first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter the last name"]
  },
  address1: {
    type: String,
    trim: true,
    required: [true, "Please add a shipping address"]
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    required: [true, "Please add the city name"]
  },
  state: {
    type: String,
    trim: true,
    required: [true, "Please add the state name"]
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Please add the country name"]
  },
  zipCode: {
    type: Number,
    required: [true, "Please add the zip code"]
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  shippingStatus: {
    type: String,
    required: [true, "Please select a shipping status"],
    enum: ["Unshipped", "Picking", "In transit", "Delivered"],
    default: "Unshipped"
  },
  paymentCard: {
    type: String,
    required: [true, "Please add a payment code"]
  },
  totalPrice: {
    type: Number,
    required: [true, "Please add the total price "]
  }
});

OrderSchema.pre("save", function() {
  this.totalPrice = this.totalPrice.toFixed(2);

  const myArray = ["Unshipped", "Picking", "In transit", "Delivered"];
  this.shippingStatus = myArray[Math.floor(Math.random() * myArray.length)];
});

module.exports = mongoose.model("Order", OrderSchema);