import express from "express"
import { createCategory, deleteCategory, getCategory, getCategoryByName } from "../controllers/categoryController.js";


const categoryRouter = express.Router();

categoryRouter.post("/",createCategory);
categoryRouter.delete("/:name",deleteCategory);
categoryRouter.get("/",getCategory)
categoryRouter.get("/:name",getCategoryByName)

export default categoryRouter;