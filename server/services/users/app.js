const express = require("express");
const app = express();
const port = 3001;
const { connect } = require("./config/mongo");
const Controller = require("./controllers/controller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/users", Controller.regis)
app.get("/users", Controller.findAll);
app.get("/users/:id", Controller.findById)
app.delete("/users/:id", Controller.deleteById)

connect().then((db) => {
    // console.log(db)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
