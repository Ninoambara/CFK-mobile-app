const  {MongoClient} = require('mongodb')
const data = require('./user.json')

// const uri =  "mongodb://127.0.0.1:27017";
const uri = "mongodb+srv://ninoambara:IeEZqELaecn8M4Le@cluster0.wg7pw1e.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const client = new MongoClient(uri)

async function run(){
    try {
        await client.connect()
        const database = client.db("cfkDB")

        const users = database.collection('users')

        const option = {ordered:true}

        const result = await users.insertMany(data,option)

        console.log(result)
    } finally{
        await client.close()
    }
}

run().catch(console.dir)