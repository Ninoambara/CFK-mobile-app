const axios = require("axios");
const redis = require("../redisConnect");
const BASE_URL_ITEM = process.env.ITEM_SERVICE_URL || "http://localhost:3000/";
const BASE_URL_USER = process.env.USER_SERVICE_URL || "http://localhost:3001/";

const userTypeDefs = `#graphql

  type User {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
  }

  type Query {
    findAllUsers: [User]
    findUserByID(id: String!): User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      phoneNumber: String!
      address: String!
      password: String
    ): User
    deleteUser(_id: String!): String
  }
`;

const userResolvers = {
  Query: {
    findAllUsers: async () => {
      const cacheKey = "findAllUsers";
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        try {
          const response = await axios.get(BASE_URL_USER + "/users");
          const data = response.data;
          await redis.set(cacheKey, JSON.stringify(data));
          return data;
        } catch (error) {
          throw new Error("Failed to fetch users: " + error.message);
        }
      }
    },
    findUserByID: async (_, { id }) => {
      const cacheKey = `findUserByID:${id}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        try {
          const response = await axios.get(BASE_URL_USER + `/users/${id}`);
          const data = response.data;
          await redis.set(cacheKey, JSON.stringify(data));
          return data;
        } catch (error) {
          throw new Error("Failed to fetch user: " + error.message);
        }
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const response = await axios.post(BASE_URL_USER + "/users", args);
        const cacheKey = "findAllUsers";
        await redis.del(cacheKey);
        return response.data;
      } catch (error) {
        throw new Error("Failed to create user: " + error.message);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await axios.delete(BASE_URL_USER + `/users/${id}`);
        const cacheKey = "findAllUsers";
        await redis.del(cacheKey);
        return `User with ID ${id} deleted successfully`;
      } catch (error) {
        throw new Error("Failed to delete user: " + error.message);
      }
    },
  },
};

module.exports = {
  userResolvers,
  userTypeDefs,
};
