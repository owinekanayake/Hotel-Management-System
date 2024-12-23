import mongoose from "mongoose";

const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
        unique:true
    },
    price: {
        type: Number,
        require: true,
      },
      features: [
        {
          type: String,
        },
      ],
      description: {
        type: String,
        require: true,
      },
      Image: {
        type: String,
      },
})

const Category = mongoose.model("categoried", categoryShema);
export default Category;