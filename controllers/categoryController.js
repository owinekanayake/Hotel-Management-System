import Category from "../models/category.js";

export function createCategory(req, res) {
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
  const newCategory = new Category(req.body);
  newCategory
    .save()
    .then((result) => {
      res.json({
        message: "Category Created successfully",
        result: result,
      });
    })
    .catch(() => {
      res.json({
        message: "Category Creation failed",
      });
    });
}

export function deleteCategory(req, res) {
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
  Category.findOneAndDelete({ name: name })
    .then(() => {
      res.json({
        message: "Category deleted successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Category deletion faield",
      });
    });
}
