const { User, Item, Category, Ingredient } = require("../models");
const { sequelize } = require("../models");
const { createToken } = require("../helpers/jwt");
const bcrypt = require("bcrypt");

class Controller {
  static async registerAdmin(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        message: `User with role Admin with email ${email} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "email cannot empty" };
      }
      if (!password) {
        throw { name: "password cannot empty" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Invalid email/password" };
      }
      const validPass = bcrypt.compareSync(password, user.password);

      if (!validPass) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: user.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        email: user.email,
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchItems(req, res, next) {
    try {
      const data = await Item.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Ingredient,
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchItemsById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Item.findByPk(id, {
        include: [{ model: Ingredient, attributes: ["name"] }],
      });
      if (!data) {
        throw {
          name: "Product not found",
        };
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteItems(req, res, next) {
    const { id } = req.params;

    try {
      await Item.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: `Item with id ${id} has beed deleted` });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async addNewItemWithIngredients(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        imgUrl,
        UserMongoId,
        categoryId,
        ingredient1,
        ingredient2,
        ingredient3,
        ingredient4,
      } = req.body;
      const newItem = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          UserMongoId,
          categoryId,
        },
        {
          transaction: t,
        }
      );

      const ingredientsData = [
        {
          name: ingredient1,
          itemId: newItem.id,
        },
        {
          name: ingredient2,
          itemId: newItem.id,
        },
        {
          name: ingredient3,
          itemId: newItem.id,
        },
        {
          name: ingredient4,
          itemId: newItem.id,
        },
      ].filter((ingredient) => ingredient.name);

      if (ingredientsData.length > 0) {
        await Ingredient.bulkCreate(ingredientsData, { transaction: t });
      } else {
        throw { name: "Ingredients cannot empty" };
      }

      await t.commit();

      res
        .status(200)
        .json({ message: "Item and ingredients added successfully" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async fetchCategory(req, res, next) {
    try {
      const data = await Category.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;

    try {
      await Category.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ message: `category with id ${id} has beed deleted` });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async addNewCategory(req, res, next) {
    try {
      const { name } = req.body;

      const data = await Category.create({
        name,
      });

      res.status(200).json({ message: "success add new category" });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async fetchIngredient(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Ingredient.findAll({
        where: {
          itemId: id,
        },
        include: [
          {
            model: Item, 
            attributes: ['name'], 
          },
        ],
      });
  
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editItemWithIngredients(req, res, next) {
    const t = await sequelize.transaction();
    try {
        const {
          name,
          description,
          price,
          imgUrl,
          UserMongoId,
          categoryId,
          ingredient1,
          ingredient2,
          ingredient3,
          ingredient4,
        } = req.body;

      const { id } = req.params;

      await Item.update(
        {
          name,
          description,
          price,
          imgUrl,
          UserMongoId,
          categoryId,
        },
        {
          where: { id },
          transaction: t,
        }
      );

      const ingredientsData = [
        {
          name: ingredient1,
          itemId: id,
        },
        {
          name: ingredient2,
          itemId: id,
        },
        {
          name: ingredient3,
          itemId: id,
        },
        {
          name: ingredient4,
          itemId: id,
        },
      ].filter((ingredient) => ingredient.name);

      await Ingredient.destroy({
        where: { itemId: id },
        transaction: t,
      });

      if (ingredientsData.length > 0) {
        await Ingredient.bulkCreate(ingredientsData, { transaction: t });
      } else {
        throw { name: "Ingredients cannot be empty" };
      }

      await t.commit();

      res
        .status(200)
        .json({ message: "Item and ingredients updated successfully" });
    } catch (error) {
      await t.rollback();
      console.log(error)
      next(error);
    }
  }

  static async fetchCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Category.findByPk(id);
      if (!data) {
        throw {
          name: "Category not found",
        };
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await Category.findByPk(id);

      if (!category) {
        throw {
          name: "Category not found",
        };
      }

      category.name = name;
      await category.save();

      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      next(error);
    }
}
}

module.exports = Controller;
