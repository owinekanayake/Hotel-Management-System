import express from 'express';
import { createGalleryItem, deleteGallaryItem, getGalleryItem } from '../controllers/galleryItemController.js';

const galleryItemRouter = express.Router()

galleryItemRouter.post("/",createGalleryItem)
galleryItemRouter.get("/", getGalleryItem)
galleryItemRouter.delete("/:name",deleteGallaryItem)

export default galleryItemRouter;