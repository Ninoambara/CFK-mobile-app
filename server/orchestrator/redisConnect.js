const Redis = require ("ioredis")

const uri = process.env.REDIS_URL
const redis = new Redis(uri)

module.exports = redis