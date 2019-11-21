const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Item", ItemSchema);