import mongoose from "mongoose";

const galleryItemSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    image: {
        type : String,
        require : true
    },
    description: {
        type : String,
        require : true
    }
});

const GalleryItem = mongoose.model("galleryItem",galleryItemSchema)

export default GalleryItem;