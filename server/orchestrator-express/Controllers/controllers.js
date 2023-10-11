const BASE_URL_ITEM = "http://localhost:3000/";
const BASE_URL_USER = "http://localhost:3001/";
const axios = require("axios");
const redis = require("../redisConnect");

class Controller {
  static async findAllItems(req, res) {
    try {
      const productCache = await redis.get("products");
      if (productCache) {
        const data = JSON.parse(productCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios({
          url: BASE_URL_ITEM + "items",
        });
        const stringProducts = JSON.stringify(data);
        await redis.set("products", stringProducts);
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createItem(req, res) {
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
      const { data } = await axios({
        url: BASE_URL_ITEM + "items",
        method: "POST",
        data: {
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
        },
      });

      await redis.del("products");

      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async findItemByID(req, res) {
    try {
      const itemId = req.params.id;
      const itemCache = await redis.get(`item:${itemId}`);

      if (itemCache) {
        const data = JSON.parse(itemCache);
        res.status(200).json(data);
      } else {
        const { data: itemData } = await axios({
          url: BASE_URL_ITEM + `items/${itemId}`,
        });

        if (!itemData) {
          throw {
            name: "Product not found",
          };
        }

        const { data: userData } = await axios({
          url: BASE_URL_USER + `users/${itemData.UserMongoId}`,
        });

        const itemWithUser = {
          ...itemData,
          user: userData,
        };

        const stringItem = JSON.stringify(itemWithUser);

        await redis.set(`item:${itemId}`, stringItem);

        res.status(200).json(itemWithUser);
      }
    } catch (error) {
      console.log(error);
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async updateItem(req, res) {
    try {
      const itemId = req.params.id;
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

      await axios({
        url: BASE_URL_ITEM + "items/" + itemId,
        method: "put",
        data: {
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
        },
      });

      await redis.del(`item:${itemId}`);

      res.status(200).json({ message: `success edit item ${itemId}` });
    } catch (error) {
      console.log(error);
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async deleteItem(req, res) {
    try {
      const itemId = req.params.id;
      await axios.delete(BASE_URL_ITEM + `items/${itemId}`);

      await redis.del(`item:${itemId}`);
      await redis.del("products");

      res.status(200).json({ message: `success delete item ${itemId}` });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async findAllCategory(req, res) {
    try {
      const categoryCache = await redis.get("categories");

      if (categoryCache) {
        const data = JSON.parse(categoryCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios({
          url: BASE_URL_ITEM + "categories",
        });
        const stringCategories = JSON.stringify(data);

        await redis.set("categories", stringCategories);

        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const { data } = await axios({
        url: BASE_URL_ITEM + "categories",
        method: "POST",
        data: {
          name,
        },
      });

      await redis.del("categories");

      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async findCategoryByID(req, res) {
    try {
      const categoryId = req.params.id;
      const categoryCache = await redis.get(`category:${categoryId}`);

      if (categoryCache) {
        const data = JSON.parse(categoryCache);
        res.status(200).json(data);
      } else {
        const { data: categoryData } = await axios({
          url: BASE_URL_ITEM + `categories/${categoryId}`,
        });

        if (!categoryData) {
          throw {
            name: "Category not found",
          };
        }

        const stringCategory = JSON.stringify(categoryData);

        await redis.set(`category:${categoryId}`, stringCategory);

        res.status(200).json(categoryData);
      }
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const { name } = req.body;

      await axios({
        url: BASE_URL_ITEM + "categories/" + categoryId,
        method: "put",
        data: {
          name,
        },
      });

      await redis.del(`category:${categoryId}`);
      await redis.del("categories");

      res.status(200).json({ message: `Success edit category ${categoryId}` });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;
      await axios.delete(BASE_URL_ITEM + `categories/${categoryId}`);

      await redis.del(`category:${categoryId}`);
      await redis.del("categories");

      res
        .status(200)
        .json({ message: `Success delete category ${categoryId}` });
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const { data } = await axios({
        url: BASE_URL_USER + "users",
        method: "POST",
        data: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });

      await redis.del("users");

      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async findAllUser(req, res) {
    try {
      const userCache = await redis.get("users");

      if (userCache) {
        const data = JSON.parse(userCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios({
          url: BASE_URL_USER + "users",
        });
        const stringUser = JSON.stringify(data);

        await redis.set("users", stringUser);

        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async findUserById(req, res) {
    try {
      const userId = req.params.id;
      const userCache = await redis.get(`user:${userId}`);

      if (userCache) {
        const data = JSON.parse(userCache);
        res.status(200).json(data);
      } else {
        const { data: userData } = await axios({
          url: BASE_URL_USER + `users/${userId}`,
        });

        if (!userData) {
          throw {
            name: "User not found",
          };
        }

        const stringUser = JSON.stringify(userData);

        await redis.set(`user:${userId}`, stringUser);

        res.status(200).json(userData);
      }
    } catch (error) {
      res.status(error.response.status || 500).json({
        message: error.response.data.message || "Internal Server Error",
      });
    }
  }

  static async deleteUser(req,res){
    try {
      const userId = req.params.id;
      const deletedUser = await axios({
        method: 'delete',
        url: BASE_URL_USER + `users/${userId}`,
      });
  
      if (deletedUser.status === 204) {

        await redis.del(`user:${userId}`);
        res.status(204).send();
      } else {
        throw {
          name: "User deletion failed",
        };
      }
    } catch (error) {
      res
        .status(error.response.status || 500) 
        .json({ message: error.response.data.message || "Internal Server Error" });
    }
  }
}

module.exports = Controller;
