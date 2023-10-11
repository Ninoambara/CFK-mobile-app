const Redis = require ("ioredis")

const uri = "redis://default:xjs4IRWcW5bQIVdlpKExyXiNigYTJj5V@redis-17039.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:17039"
const redis = new Redis(uri)

module.exports = redis