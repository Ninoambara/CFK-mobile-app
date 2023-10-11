const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register-admin", Controller.registerAdmin );
router.post("/login-admin", Controller.loginAdmin );
router.get("/pub/items",Controller.fetchItems )
router.get("/pub/items/:id", Controller.fetchItemsById)

// router.use(authentication)

router.get("/items", Controller.fetchItems)
router.post("/items", Controller.addNewItemWithIngredients)
router.delete("/items/:id", Controller.deleteItems)
router.get("/items/:id", Controller.fetchItemsById)
router.put("/items/:id", Controller.editItemWithIngredients)
router.get("/categories", Controller.fetchCategory)
router.post("/categories", Controller.addNewCategory)
router.get("/categories/:id", Controller.fetchCategoryById)
router.delete("/categories/:id", Controller.deleteCategory)
router.put("/categories/:id", Controller.editCategory)
router.get("/ingredients/:id", Controller.fetchIngredient)

module.exports = router;
