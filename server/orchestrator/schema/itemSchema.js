const axios = require("axios");
const redis = require("../redisConnect");
const BASE_URL_ITEM = process.env.ITEM_SERVICE_URL || "http://localhost:3000/";
const BASE_URL_USER = process.env.USER_SERVICE_URL || "http://localhost:3001/";

const itemTypeDefs = `#graphql
   type Item {
     id: String
     name: String
     description: String
     price: Int
     imgUrl: String
     user: User
     Category: Category
     Ingredients: [Ingredient]
     categoryId: Int
   }

   type Category {
     id: String
     name: String
   }

   type User {
     _id: String
     username: String
     email: String
     phoneNumber: String
     address: String
   }

   type Ingredient {
     id: String
     name: String
   }

   type Query {
     findAllItems: [Item]
     findItemByID(id: String!): Item
   }

   type Mutation {
     createItem(
       name: String!
       description: String
       price: Int
       imgUrl: String
       categoryId: Int
       ingredient1: String
       ingredient2: String
       ingredient3: String
       ingredient4: String
       UserMongoId: String
     ): String
     updateItem(
       id: String!
       name: String!
       description: String
       price: Int
       imgUrl: String
       categoryId: Int
       ingredient1: String
       ingredient2: String
       ingredient3: String
       ingredient4: String
     ): String
     deleteItem(id: String!): String
   }
 `;

const itemResolvers = {
  Query: {
    findAllItems: async () => {
      const cacheKey = "findAllItems";
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        try {
          const response = await axios.get(BASE_URL_ITEM + "/items");
          const data = response.data;
          await redis.set(cacheKey, JSON.stringify(data));
          return data;
        } catch (error) {
          throw new Error("Failed to fetch items: " + error.message);
        }
      }
    },
    findItemByID: async (_, { id }) => {
      const cacheKey = `findItemByID:${id}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        try {
          const itemResponse = await axios.get(BASE_URL_ITEM + `/items/${id}`);
          const itemData = itemResponse.data;

          const userResponse = await axios.get(
            BASE_URL_USER + `/users/${itemData.UserMongoId}`
          );
          const userData = userResponse.data;

          const categoryResponse = await axios.get(
            BASE_URL_ITEM + `/categories/${itemData.categoryId}`
          );
          const categoryData = categoryResponse.data;

          const ingredienResponse = await axios.get(
            BASE_URL_ITEM + `/ingredients/${itemData.id}`
          );

          const ingredientData = ingredienResponse.data;

          const result = {
            id: itemData.id,
            name: itemData.name,
            description: itemData.description,
            price: itemData.price,
            imgUrl: itemData.imgUrl,
            user: userData,
            Category: categoryData,
            Ingredients: ingredientData,
          };

          await redis.set(cacheKey, JSON.stringify(result));
          return result;
        } catch (error) {
          throw new Error("Failed to fetch item: " + error.message);
        }
      }
    },
  },
  Mutation: {
    createItem: async (_, args) => {
      try {
        const response = await axios.post(BASE_URL_ITEM + "/items", args);
        const cacheKey = "findAllItems";
        await redis.del(cacheKey);
        return response.data.message;
      } catch (error) {
        throw new Error("Failed to create item: " + error.message);
      }
    },
    updateItem: async (_, { id, ...args }) => {
      try {
        const response = await axios.put(BASE_URL_ITEM + `/items/${id}`, args);
        const cacheKey = "findAllItems";
        await redis.del(cacheKey);
        return response.data.message;
      } catch (error) {
        throw new Error("Failed to update item: " + error.message);
      }
    },
    deleteItem: async (_, { id }) => {
      try {
        const response = await axios.delete(BASE_URL_ITEM + `/items/${id}`);
        const cacheKey = "findAllItems";
        await redis.del(cacheKey);
        return response.data.message;
      } catch (error) {
        throw new Error("Failed to delete item: " + error.message);
      }
    },
  },
};

module.exports = {
  itemTypeDefs,
  itemResolvers,
};
