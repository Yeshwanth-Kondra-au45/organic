const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");

const router = express.Router()

router.get(
  "/products",
  getAllProducts
);
router.post("/admin/products/new", isAuthenticatedUser,authorizeRoles("admin") ,createProduct);

router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.delete("/admin/product/:id", isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);

router.get("/product/:id",getProductDetails);
router.put("/review",isAuthenticatedUser, createProductReview);

router.get("/reviews",getProductReviews)
router.delete("/reviews",isAuthenticatedUser,deleteReview)
module.exports = router