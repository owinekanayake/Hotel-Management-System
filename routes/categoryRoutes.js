import express from "express"
import { createCategory, deleteCategory, getCategory, getCategoryByName, updateCategory } from "../controllers/categoryController.js";


const categoryRouter = express.Router();

categoryRouter.post("/",createCategory);
categoryRouter.delete("/:name",deleteCategory);
categoryRouter.get("/",getCategory)
categoryRouter.get("/:name",getCategoryByName)
categoryRouter.put("/:name",updateCategory)

export default categoryRouter;