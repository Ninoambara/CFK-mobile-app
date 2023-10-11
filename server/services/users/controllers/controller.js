const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const User = require("../models/user");

class Controller {
  static async findAll(req, res) {
    try {
      const users = await User.findAll();
      if (!users) {
        throw {
          name: "user not found",
        };
      }
      return res.json(users);
    } catch (error) {
      if (error.name === "user not found") {
        res.status(400).json(error.name);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        throw {
          name: "user not found",
        };
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      if (error.name === "user not found") {
        res.status(400).json(error);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  static async regis(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
      };

      const result = await User.create(userData);
      if (result.acknowledged) {
        return res.json({ message: "Pengguna berhasil ditambahkan" });
      } else {
        return res.status(500).json({ message: "Gagal menambahkan pengguna" });
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan pengguna:", error);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat menambahkan pengguna" });
    }
  }

  static async deleteById(req, res) {
    try {
      const userId = req.params.id;

      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "ID pengguna tidak valid" });
      }

      const result = await User.delete(userId);
      if (result.deletedCount === 1) {
        return res.json({ message: "Pengguna berhasil dihapus" });
      } else {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus pengguna:", error);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat menghapus pengguna" });
    }
  }
}

module.exports = Controller;
