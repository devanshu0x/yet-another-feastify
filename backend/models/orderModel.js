import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },//
  items: { type: Array, required: true },//
  amount: { type: Number, required: true },//
  address: { type: Object, default:{} },  //
  status: { type: String, default: "Food Processing" },//
  date: { type: Date, default: Date.now() },//
  paymentMode: {type:String, required:true},  //
  paymentStatus: { type: Boolean, default: false },//
  notes:{type: String, default: ""},//
  phoneNumber:{type:String, default:""},//
  isDineIn:{type:Boolean, required:true},//
  tableNumber:{type:String, default:""}//
});

const orderModel =
mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
