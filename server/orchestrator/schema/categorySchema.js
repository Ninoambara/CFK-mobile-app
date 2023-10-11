const axios = require("axios")
const redis = require("../redisConnect");
const BASE_URL_ITEM = process.env.ITEM_SERVICE_URL || "http://localhost:3000/";
const BASE_URL_USER = process.env.USER_SERVICE_URL || "http://localhost:3001/";

const categoryTypeDefs = `#graphql
  type Category {
    id: String
    name: String
  }


  type Query {
    findAllCategories: [Category]
    findCategoryByID(id: String!): Category
  }

  type Mutation {
    createCategory(name: String!): String
    updateCategory(id: String!, name: String!): String
    deleteCategory(id: String!): String
  }
`;

const categoryResolvers = {
  Query: {
    findAllCategories: async () => {
      const cacheKey = "findAllCategories";
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        try {
          const response = await axios.get(BASE_URL_ITEM + "/categories");
          const data = response.data;
          await redis.set(cacheKey, JSON.stringify(data));
          return data;
        } catch (error) {
          throw new Error("Failed to fetch categories: " + error.message);
        }
      }
    },
    findCategoryByID: async (_, { id }) => {
      const cacheKey = `findCategoryByID:${id}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        try {
          const response = await axios.get(BASE_URL_ITEM + `/categories/${id}`);
          const data = response.data;
          await redis.set(cacheKey, JSON.stringify(data));
          return data;
        } catch (error) {
          throw new Error("Failed to fetch category: " + error.message);
        }
      }
    },
  },
  Mutation: {
    createCategory: async (_, { name }) => {
      try {
        const response = await axios.post(BASE_URL_ITEM + "/categories", {
          name,
        });
        const cacheKey = "findAllCategories";
        await redis.del(cacheKey);
        return response.data.message;
      } catch (error) {
        throw new Error("Failed to create category: " + error.message);
      }
    },
    updateCategory: async (_, { id, name }) => {
      try {
        const response = await axios.put(BASE_URL_ITEM + `/categories/${id}`, {
          name,
        });
        const cacheKey = `findCategoryByID:${id}`;
        await redis.del(cacheKey);
        const cacheAllKey = "findAllCategories";
        await redis.del(cacheAllKey);
        return response.data.message;
      } catch (error) {
        throw new Error("Failed to update category: " + error.message);
      }
    },
    deleteCategory: async (_, { id }) => {
      try {
        await axios.delete(BASE_URL_ITEM + `/categories/${id}`);
        const cacheKey = `findCategoryByID:${id}`;
        await redis.del(cacheKey);
        const cacheAllKey = "findAllCategories";
        await redis.del(cacheAllKey);
        return `Category with ID ${id} deleted successfully`;
      } catch (error) {
        throw new Error("Failed to delete category: " + error.message);
      }
    },
  },
};

  module.exports = {
    categoryTypeDefs, categoryResolvers
  }