const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require("axios");
const {
  categoryTypeDefs,
  categoryResolvers,
} = require("./schema/categorySchema");
const { itemTypeDefs, itemResolvers } = require("./schema/itemSchema");
const { userTypeDefs, userResolvers } = require("./schema/userSchema");
const PORT = process.env.PORT || 4000
const BASE_URL_ITEM = process.env.ITEM_SERVICES_URL || "http://localhost:3000/";
const BASE_URL_USER = process.env.USER_SERVICES_URL || "http://localhost:3001/";


const server = new ApolloServer({
  typeDefs: [categoryTypeDefs,itemTypeDefs,userTypeDefs],
  resolvers: [categoryResolvers, itemResolvers, userResolvers],
  introspection: true
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`server ready at ${url}`);
});
