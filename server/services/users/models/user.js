const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");

class User {
  static users() {
    const userCollection = getDb().collection("users");
    return userCollection;
  }
  static async findByPk(id) {
    return await this.users().findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { password: 0 } }
    );
  }

  static async findAll() {
    return await this.users()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }

  static async create(data) {
    return await this.users().insertOne(data);
  }

  static async delete(id) {
    return await this.users().deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = User;
