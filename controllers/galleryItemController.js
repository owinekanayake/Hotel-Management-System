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
