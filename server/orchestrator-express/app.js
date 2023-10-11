const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const Controller = require("./Controllers/controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/users", Controller.createUser);
app.get("/users", Controller.findAllUser);
app.get("/users/:id", Controller.findUserById);
app.delete("/users/:id", Controller.deleteUser);
app.get("/items", Controller.findAllItems);
app.post("/items", Controller.createItem);
app.get("/items/:id", Controller.findItemByID);
app.put("/items/:id", Controller.updateItem);
app.delete("/items/:id", Controller.deleteItem);
app.get("/categories", Controller.findAllCategory);
app.post("/categories", Controller.createCategory);
app.get("/categories/:id", Controller.findCategoryByID);
app.put("/categories/:id", Controller.updateCategory);
app.delete("/categories/:id", Controller.deleteCategory);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
