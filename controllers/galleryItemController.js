import GalleryItem from "../models/galleryItemSchema.js";

export function createGalleryItem(req, res) {
  const user = req.body.user;
  if (user == null) {
    res.status(403).json({
      message: "Please login to create a gallery iteme",
    });
    return;
  }

  const galleryItem = req.body.item;

  const newGalleryItem = new GalleryItem(galleryItem);
  newGalleryItem
    .save()
    .then(() => {
      res.json({
        message: "Gallery Item Created successfilly",
      });
    })
    .catch(() => {
      res.json({
        message: "Gallery Item creation failed",
      });
    });
}

export function getGalleryItem(req, res) {
  GalleryItem.find().then((list) => {
    res.json({
      list: list,
    });
  });
}

export function deleteGallaryItem(res,req){
  if (req.body.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  if (req.body.user.type != "admin") {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }
  const name = req.params.name;
  GalleryItem.findOneAndDelete({name:name})
  .then(()=>{
    res.json({
      message:"GalleryItem deleted successfully"
    });
  })
  .catch(()=>{
    res.json({
      message:"GalleryItem deletion failed"
    })
  })
}
