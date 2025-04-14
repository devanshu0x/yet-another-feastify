import mongoose from "mongoose";

const addressSchema= new mongoose.Schema(
  {
    type:{type: String, required:true},
    title:{type:String, default:""},
    address:{type:String, required:true}
  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default:"user" },
    cartData: { type: Object, default: {} },
    addresses:{type:[addressSchema], default: []},
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
